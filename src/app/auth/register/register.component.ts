import { Subscription } from 'rxjs';
import * as ui from './../../shared/ui.actions';
import { Usuario } from './../../shared/models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  uiSusbscription$:Subscription;
  registroForm :FormGroup;
  cargando:boolean = false;
  constructor( private fb: FormBuilder,
              private store:Store<AppState>,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit() {
    this.uiSusbscription$ = this.store.select('ui').subscribe( ui =>{
      this.cargando = ui.isLoading;
      console.log("cargando en registroComponent",this.cargando)
    })
    this.inicializaForm();
  }
  ngOnDestroy(): void {
      this.uiSusbscription$.unsubscribe();
  }

  private inicializaForm(){
    this.registroForm = this.fb.group({
      nombre : ["", Validators.required],
      correo : ["", [Validators.required]],
      password : ["", Validators.required, ],
    })
  }

  crearUsuario(){
    if(this.registroForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    try {
      const usuario: Usuario = this.registroForm.value;
      // Swal.fire({
      //   title: 'Cargando',
      //   didOpen: () => {
      //       Swal.showLoading(null)
      //   }
      // })
      this.authService.crearUsuario(usuario).then( userCreado => {
            console.log("creado user",userCreado);
            console.log(userCreado.idUsuario);
            // Swal.close();
            this.store.dispatch(ui.stopLoading());
            this.router.navigate(['/']);
          })
          .catch(e=>{
            console.warn("error al loguearse",e.code);
            this.store.dispatch(ui.stopLoading());
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.message,
            })
        })

    } catch (error) {
      console.log("ha ocurrido un error al crear usuario")
    }
  }


}
