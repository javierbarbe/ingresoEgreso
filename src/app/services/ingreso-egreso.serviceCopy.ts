import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

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
//#region CTOR
  constructor() {
  }
//#endregion

//#region === PROPERTIES
  fireModal$:ReplaySubject<modal> = new ReplaySubject(1);
//#endregion

//#region ==== PUBLIC METHODS ======
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
  //#endregion
}
