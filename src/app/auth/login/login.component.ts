import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../shared/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loguear } from '../auth.actions';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
export interface AppState  {
  usuario:Usuario
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  usuario:Usuario = {
    nombre:"Javier"
  }
  logForm :FormGroup;
  constructor(private store:Store<AppState>,
              private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) {
    this.logForm = fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  loguearse(){
    console.log(this.logForm.valid)
    if(this.logForm.invalid) return;
    Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        // setTimeout(() => {

          Swal.showLoading(null)
        // }, 2000);
  }})
  setTimeout(() => {

    this.authService.loguearUsuario(this.logForm.value)
      .then(r=> {
        console.log("logueo existoso",r);
        this.router.navigate(['/']);
        Swal.close();
        // Swal.hideLoading();
    })
      .catch(e=>{ console.warn("error al loguearse",e.code);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message,
      })
    })
  }, 1000);
    // this.store.dispatch(loguear({usuario:this.usuario}));
  }
}
