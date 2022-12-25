import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// import { AuthGuard } from '../services/auth.guard';
import { dashboardRoutes } from './dashboard.routes';
import { SharedModule } from '../shared/shared.module';

const rutasHijas : Routes = [
      {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes
        // canActivate:[AuthGuard],
    }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(rutasHijas),
    SharedModule
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }
