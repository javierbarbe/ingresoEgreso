import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.serviceCopy';
import Swal from 'sweetalert2';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-prueba-fcc',
  templateUrl: './prueba-fcc.component.html',
  styleUrls: ['./prueba-fcc.component.css']
})
export class PruebaFCCComponent {

//#region ====== PROPERTIES ==========
ingresoSubs$: Subscription;
//#endregion ==== END OF PROPERTIES
ngOnDestroy(): void {
  if(this.ingresoSubs$) this.ingresoSubs$.unsubscribe();
}

//#region ===== CTOR ========
constructor(private ingresoEgresoService:IngresoEgresoService){
  // IN CASE OF FORM
this.ingresoSubs$ =  this.ingresoEgresoService.fireModal$.subscribe(modal=> {
    this._showConfirmationModal(modal.title,modal.text,modal.confirmButtonTxt,modal.cancelBtnTxt,modal.showCancelBtn,modal.allowCloseNoAnswer);
  })
}
//#endregion ================

//#region ===== PRIVATE METHODS =========
private _showConfirmationModal(title:string,text:string,confirmButtonTxt:string,cancelBtnTxt:string,showCancelBtn:boolean,allowCloseNoAnswer:boolean){
  Swal.fire({   title,
                text,
                confirmButtonText:confirmButtonTxt,
                cancelButtonText:cancelBtnTxt,
                showCancelButton:showCancelBtn,
                allowOutsideClick:allowCloseNoAnswer
  })
  .then(({isDismissed})=>
    {
      if(isDismissed){
        console.log("Cancelled");
        // TODO: ACT IN CONSECUENCE
      }else{
        // TODO: ACT IN CONSECUENCE... CALL SERVICES...
        console.log("Ok button pressed")
      }
    }
    ).catch(err=> {
      console.warn("Something went wrong",err)
    })
}

// Al utilizar un servicio simulo la llamada desde cualquier parte
callFireModal(){
  this.ingresoEgresoService.answerForm({resp1:"Javier",resp2:"Barbero"})
}
//#endregion ==========
//#endregion ==========
}
