import * as ui from "./../../shared/ui.actions";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Usuario } from "./../../shared/models/usuario.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { AppState } from "../../app.reducer";
import { Subscription } from "rxjs";
// export interface AppState  {
//   usuario:Usuario
// }

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  usuario: Usuario = {
    nombre: "Javier",
  };
  cargando: boolean = false;
  logForm: FormGroup;
  UISubs$: Subscription;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.logForm = fb.group({
      correo: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.UISubs$ = this.store.select("ui").subscribe((ui) => {
      console.log("el ui subs", ui);
      this.cargando = ui.isLoading;
    });

  }
  ngOnDestroy(): void {
    this.UISubs$.unsubscribe();
  }
  loguearse() {
    console.log(this.logForm.valid);
    if (this.logForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Cargando',
    //   didOpen: () => {
    //       Swal.showLoading(null)
    //  }})
      this.authService
        .loguearUsuario(this.logForm.value)
        .then(({ user }) => {
          console.log("logueo existoso", user);

          this.store.dispatch(ui.stopLoading());
          this.router.navigate(["/"]);
          // Swal.close();
        })
        .catch((e) => {
          console.warn("error al loguearse", e.code);
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.message,
          });
        });
    // this.store.dispatch(loguear({usuario:this.usuario}));
  }
}
