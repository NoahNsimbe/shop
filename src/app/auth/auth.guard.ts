import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';
import {  Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router, private store: Store) { }
  constructor(private store: Store, private _snackBar: MatSnackBar, private _router: Router, ) { }

  canActivate() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/secret-random-number']);
    // }
    // return !this.authService.isLoggedIn();

    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated){
      this._snackBar.open("Please login to access your account");
      this._router.navigate(['/account/login']);
    }
    return isAuthenticated;
  }
}