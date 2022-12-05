import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}
  canActivate():  Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( (estado) => {
        console.log("estoy logueado?",estado)
        if (!estado) this.router.navigate(['/login'])}
      ));
  }



}
