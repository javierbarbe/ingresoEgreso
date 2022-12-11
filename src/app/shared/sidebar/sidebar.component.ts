import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import *   as auth from '../../auth/auth.actions';
import { AuthService } from './../../services/auth.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private store:Store<AppState>) { }

  ngOnInit() {
  }
  logout(){
    console.log("deslogando")
    this.authService.logout()
      .then(()=> {
        this.router.navigate(["/login"])});
  }
}
