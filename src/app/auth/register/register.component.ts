import { Usuario } from './../../shared/models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {


  registroForm :FormGroup;
  constructor( private fb: FormBuilder, private authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre : ["", Validators.required],
      correo : ["", [Validators.required]],
      password : ["", Validators.required, ],
    })
  }

  crearUsuario(){
    if(this.registroForm.invalid) return;
    try {
      const usuario: Usuario = this.registroForm.value;
      Swal.fire({
        title: 'Cargando',
        didOpen: () => {
            Swal.showLoading(null)
    }})
      this.authService.crearUsuario(usuario)
          .then(r=> {
            console.log("creado user",r);
            console.log(r.idUsuario);
            Swal.close();
            this.router.navigate(['/']);
          })
          .catch(e=>{ console.warn("error al loguearse",e.code);

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
