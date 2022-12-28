import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//NGRX
import { appReducers } from './app.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from './shared/shared.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { AuthModule } from './auth/auth.module';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // IngresoEgresoComponent,
    // DashboardComponent,
    // EstadisticaComponent,
    // DetalleComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    IngresoEgresoModule,
    // provideFirebaseApp(()=>initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
      logOnly:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
