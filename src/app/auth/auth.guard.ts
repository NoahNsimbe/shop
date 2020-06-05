import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  Store } from '@ngxs/store';
import { AuthState } from '../shared/states/auth.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private _snackBar: MatSnackBar, private _router: Router, ) { }

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated){
      this._snackBar.open("Please login to access your account");
      this._router.navigate(['/account/login']);
    }
    return isAuthenticated;
  }
}