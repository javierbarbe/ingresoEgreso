import { IngresoEgreso } from './../shared/models/ingreso-egreso';
import { lastValueFrom, take } from 'rxjs';
import { AppState } from './../app.reducer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../auth/auth.actions';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fs : AngularFirestore, private store: Store<AppState>) { }

  private _ingresosEgresosNotNull(user:Usuario){
    if(!user.ingresos) user.ingresos = []
    if(!user.egresos)  user.egresos  = []
  }

  private _generaClaveIngresoEgreso(ingreso:IngresoEgreso,user:Usuario): string{
    let clave = ingreso.descripcion + "-" + ingreso.monto// + "-" + Date.now();
    ingreso.uid = user.idUsuario + "-" + clave;
    return clave;
  }

  grabarIngreso(tipo:string, ingreso:IngresoEgreso){
    this.store.select('auth').pipe(take(1)).subscribe( async ({user})=> {
      console.log('el usaurio al grabar ingreso',user);
      const consulta$ = this.fs.collection<Usuario>("usuarios", (ref)=> ref.where("idUsuario", "==",user.idUsuario)).get();
      const refdocs = await lastValueFrom(consulta$);
      const clave = this._generaClaveIngresoEgreso(ingreso, user);
      const id = refdocs.docs[0].id;
      this._ingresosEgresosNotNull(user);

      if(tipo == "ingreso"){
       if(!user.ingresos.includes(ingreso)){
        user.ingresos.push( ingreso)
       }else{
        console.log("el registro ya existe")
       }
      }
      else {
        if(!user.egresos.includes(ingreso)){
          user.egresos.push(ingreso)
        }else{
          console.log("el egreso ya existe")
        }
      }
      let newUser= await this.fs.doc("/usuarios/"+id).update(user);
            // .pipe(take(1))
          // .subscribe( async (refdocs) => {

          //   console.log(user);
          //   console.log(newUser)
          // });
          return true;

    //   this.fs.collection("usuarios", (ref)=> ref.where("idUsuario", "==", user.idUsuario))
    //     .valueChanges()
    //     .subscribe((user:Usuario[])=> {

    //       console.log("el usuario de firebase",user[0]);
    //       user[0].nombre="joaqion";
    //       this.fs.doc("/usuarios/"+user[0].idUsuario).update(user[0])
    //         .then(r=> {
    //           console.log("actualizado usuario",r)
    //         })
    //     })
    });
    // let usuarioActual: Usuario =

  }
}
