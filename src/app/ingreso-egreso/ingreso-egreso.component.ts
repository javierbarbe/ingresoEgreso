import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo : string = "ingreso";
  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion : ["", Validators.required],
      monto : ["", Validators.required],
    })
  }

  guardar(){

    if(this.ingresoForm.invalid) return;

    console.log(this.ingresoForm.value);
    this.ingresoEgresoService.grabarIngreso(this.tipo,this.ingresoForm.value);
    console.log(this.tipo)
  }

}
