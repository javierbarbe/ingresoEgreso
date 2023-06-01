import { tiposValidos } from './../ingreso-egreso/ingreso-egreso.actions';
import { pipe, ReplaySubject } from 'rxjs';
import { IngresoEgreso } from '../shared/models/ingreso-egreso';
import { lastValueFrom, take } from 'rxjs';
import { AppState } from '../app.reducer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import *  as auth from '../auth/auth.actions';
import { Usuario } from '../shared/models/usuario.model';
import { AuthService } from './auth.service';
import * as ingresoEgreso from '../ingreso-egreso/ingreso-egreso.actions';

interface FormularioValue {
  resp1:string,
  resp2:string
}
export interface modal {
  title:string,
  text:string,
  confirmButtonTxt:string,
  cancelBtnTxt:string,
  showCancelBtn:boolean,
  allowCloseNoAnswer:boolean,
}

@Injectable({
  providedIn: 'root'
})

export class IngresoEgresoService {
usuario : Usuario;
  constructor(private fs : AngularFirestore, private store: Store<AppState>, private authService: AuthService) {

    this.store.select("ingresosEgresos").subscribe( (res) =>{
      console.log("suscripcion iNgresosEgresos",res)
//  this.store.dispatch(auth.setUser( { user} ));
    })
    this.store.select("auth").subscribe(auth=> {
      this.usuario = auth.user;
    })

  }

  private _chekIngresosEgresosNotNull(user:Usuario){
    if(!user.ingresos) user.ingresos = [];
    if(!user.egresos)  user.egresos  = [];
  }

  private _generaClaveIngresoEgreso(ingreso:IngresoEgreso, user:Usuario, tipo:tiposValidos): IngresoEgreso{
    let clave = ingreso.descripcion + "-" + ingreso.monto// + "-" + Date.now();
    ingreso.uid = user.idUsuario + "-" + clave;
    ingreso.tipo = tipo;
    return { ...ingreso }
  }

  private _addIngresoIfNew(user:Usuario, ingreso : IngresoEgreso){
    if ( user.ingresos?.filter((ingresoA) => { if (ingreso.uid == ingresoA.uid){
      return ingreso
    }}).length == 0 ) {
      // user.ingresos = [...user.ingresos, ingreso];
      return true;
    } else return false;
  }

  async grabarIngreso(tipo:tiposValidos, ingreso:IngresoEgreso){
        // let user        = this.authService.usuario;
        let user        = {...this.usuario};
        const consulta$ = this.fs.collection<Usuario>("usuarios", (ref)=> ref.where("idUsuario", "==",user.idUsuario)).get();
        const refdocs   = await lastValueFrom(consulta$);
        const id        = refdocs.docs[0].id;
        ingreso         = this._generaClaveIngresoEgreso(ingreso, user, tipo);
        this._chekIngresosEgresosNotNull(user);
        switch (tipo) {

          case "ingreso":
            if (!this._addIngresoIfNew(user,ingreso)) throw new Error ("El INGRESO ya existe");
            user.ingresos = [...user.ingresos, ingreso];
            this.store.dispatch(ingresoEgreso.setItems({ items:[ ...user.ingresos ] }))
            break;

          case "egreso":
            if (!this._addEgresoIfNew(user,ingreso)) throw new Error("El EGRESO ya existe");
            user.egresos = [...user.egresos, ingreso];
            this.store.dispatch(ingresoEgreso.setItems({ items:[ ...user.egresos] }))
            break;

          default:
            break;
        }
        console.log("el user a poner en el auth", user)
        this.store.dispatch(auth.setUser({user}));


        // this.store.dispatch(ingresoEgreso.setItems( ingresoEgreso.setItems( {items:[...user.ingresos, ...user.egresos, ingreso]})));
        // this.store.dispatch(auth.addIngresoEgreso({user}))
        return this.fs.doc("/usuarios/"+id).update(user);
  }

  private _addEgresoIfNew(user:Usuario, egreso: IngresoEgreso): boolean{
    let addOk: boolean = true;
    if ( user.egresos.filter(egresoA => ( egreso.uid == egresoA.uid) ).length == 0)
    return addOk;
    else addOk = false;
    return addOk;
  }

  fireModal$:ReplaySubject<modal> = new ReplaySubject(1);

   answerForm(form:FormularioValue){
    const modalBody:modal = {
      allowCloseNoAnswer:true,
      cancelBtnTxt:"Cancel",
      confirmButtonTxt:"OK",
      showCancelBtn:true,
      text:"Hello FCC",
      title:"Prueba FCC"
    }
    this.fireModal$.next(modalBody);
  }
}
