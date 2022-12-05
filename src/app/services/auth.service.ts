import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth, private firestore:AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(firebaseUser=>{
      console.log(firebaseUser);
      console.log(firebaseUser?.email);
      console.log(firebaseUser?.uid);
    })
  }

  crearUsuario(usuario:Usuario){
    console.log("el user", usuario);
    return this.auth.createUserWithEmailAndPassword(usuario.correo,usuario.password)
            .then(({user})=> {
              const usuarioNuevo:Usuario = {
                correo: user.email,
                idUsuario : user.uid,
                nombre: usuario.nombre
               }
               this.firestore.collection('usuarios').add(
                usuarioNuevo
               ).then(res=> {
                console.log("usuariocreado",res)
               })
               .catch(err=> console.warn("errores al grabar user",err))
               return usuarioNuevo as Usuario;
            })
  }

  loguearUsuario(usuario:Usuario){
    return this.auth.signInWithEmailAndPassword(usuario.correo,usuario.password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
   return this.auth.authState.pipe(
    map(fbUser=>  fbUser != null )
    )
  }
}
