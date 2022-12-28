import { async } from '@angular/core/testing';
import { environment } from "./../../environments/environment.prod";
import * as auth from "../auth/auth.actions";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Usuario } from "../shared/models/usuario.model";
import { map, pipe, Subscription, take, tap } from "rxjs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { initializeApp } from "@angular/fire/app";

// Initialize Cloud Firestore and get a reference to the service
@Injectable({
  providedIn: "root",
})
export class AuthService {

  userSuscription : Subscription;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) {}
  //  app = initializeApp(environment.firebase);
  //  db = getFirestore(this.app);

  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => {
      console.log("initAuthListener", firebaseUser);
      // Create a reference to the cities collection
      // Create a query against the collection
      // const queryRef = usersRef.where('state', '==', 'CA');
      if (firebaseUser) {
        //#region BASURA
        // const usuariosRef = collection(this.firestore.firestore, "usuarios");

        // Create a query against the collection.
        // const q = query(usuariosRef, where("idUsuario", "==", firebaseUser.uid));
        // const res = await getDocs(q);//.then(r=> console.log("encontrado",r));
        // const res1 = getDocs(q).then(r=> console.log("encontrado2",r));
        // console.log({query:q,respuesta:res,respuesta2:res1})
        // console.log(firebaseUser.uid);

        // const qa = query(collection(db, "usuarios"), where("idUsuario", "==", firebaseUser.uid));
        // qa.
        // const querySnapshot =  getDocs(collection(this.db, "usuarios")).then(doc=> {

        //   doc.forEach(doc1=> {
        //     console.log("objeto doc1",doc1)
        //     console.log(`${doc1.id} => ${doc1.data()}`);

        //   })
        // });
        //#endregion

        // this.firestore.collection("usuarios", ref=> ref.where("idUsuario","==",firebaseUser.uid)).get()
        //     .subscribe(data=>data.forEach( el=> console.log("el.data() == ",el.data()) ));

        // this.firestore
        //   .collection("usuarios").get()
        //   .subscribe((data) =>
        //     data.forEach((el) => console.log("el.data()  TODOS", el.data()))
        //   );

        this.userSuscription = this.firestore
                .collection<Usuario>("usuarios", (ref) => ref.where("idUsuario", "==", firebaseUser.uid))
                .valueChanges()
                .pipe(
                  take(1),
                  map((userResp:Usuario[]) => {
                    const user = userResp[0] as Usuario;
                    console.log("el usuario desde firebase", user);
                    this.store.dispatch( auth.setUser({ user }) );
                        // al coincidir las propiedades de firebase con las del objeto state no es necesaria conversión
                        //user : {
                        //   correo: firebaseUser.email,
                        //   idUsuario: firebaseUser.uid,
                        //   nombre: user.nombre,
                        // },
                    return user;
                  })
                )
          .subscribe((res) => {
            console.log("resultado suscripcion", res);
          });
      } else {
        console.log("no hay usuario");
        // desloguea del store
        this.userSuscription.unsubscribe(); // controla la emision de observables cuando me deslogueo o no hay usuario
        this.store.dispatch(auth.unsetUser());
      }
    });
  }

  listadoUsuariosRegistrados(){
     this.firestore.collection<Usuario[]>("usuarios").valueChanges()
          .pipe( take(1),
            // map((userResp) => {
            //   return userResp;
            // })
          )
          .subscribe((res) => {
            console.log("lista entera de usuarios", res);
          });
  }

  crearUsuario(usuario: Usuario) {
    console.log("el user", usuario);
    return this.auth
      .createUserWithEmailAndPassword(usuario.correo, usuario.password)
      .then( async ({ user }) => {
        const usuarioNuevo: Usuario = {
          correo: user.email,
          idUsuario: user.uid,
          nombre: usuario.nombre,
        };

        // return await this.firestore.doc(`${user.uid}/usuario`).set(usuarioNuevo)
      //#region manera antigua??
        this.firestore
          .collection("usuarios")
          .add(usuarioNuevo)
          .then((res) => {
            console.log("usuariocreado", res);
          })
          .catch((err) => console.warn("errores al grabar user", err));
        return usuarioNuevo as Usuario;
        //#endregion
      });
  }

  loguearUsuario(usuario: Usuario) {
    return this.auth.signInWithEmailAndPassword(
      usuario.correo,
      usuario.password
    );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
