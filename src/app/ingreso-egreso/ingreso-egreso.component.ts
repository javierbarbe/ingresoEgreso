import { isLoading } from '../shared/ui.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import  * as ui from '../shared/ui.actions';
import {  tiposValidos } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../shared/models/ingreso-egreso';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm : FormGroup;
  tipo        : tiposValidos = "ingreso";
  cargando    : boolean = false;

  ingresosEgresos:IngresoEgreso [];

  constructor( private fb: FormBuilder,
               private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    // this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
    this.store.select('ui').subscribe( ({ isLoading }) => this.cargando = isLoading);
    this.store.select("ingresosEgresos").subscribe(state=> {
      console.log("los ingresosEgresos suscritos", state.items)
      this.ingresosEgresos = state.items;
    })
    this.ingresoForm = this.fb.group({
      descripcion : ["", Validators.required],
      monto : ["", Validators.required],
    })
  }

  cambiaEgresoIngreso(tipo:tiposValidos){
    this.tipo = tipo;
    console.log("el tipo", this.tipo)

    // this.store.dispatch(showItems( {tipo, items:this.ingresosEgresos  } ))
  }

  guardar(){

    this.store.dispatch(ui.isLoading());
    if(this.ingresoForm.invalid) return;

    console.log(this.ingresoForm.value);
    this.ingresoEgresoService.grabarIngreso(this.tipo,{...this.ingresoForm.value})
      .then(()=> {
        console.log("Grabado Ingreso!");
      })
      .catch((err)=> {
        console.warn("Grabando ingreso...",err)
      })
      .finally( () => this.store.dispatch(ui.stopLoading()) )
    }

}
