import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';
import {  Store } from '@ngxs/store';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router, private store: Store) { }
  constructor(private store: Store) { }

  canActivate() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/secret-random-number']);
    // }
    // return !this.authService.isLoggedIn();

    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    return isAuthenticated;
  }
}