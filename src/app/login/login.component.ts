import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login, Register, ResetAuth } from '../auth/auth.actions';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _appStore: Store, public _loginRef: MatDialogRef<LoginComponent>) {

    this.loginForm = this._fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

   }

  ngOnInit(): void {
 //  	this._appStore.dispatch([
	//   new SetFormEnabled('auth.loginForm'),
	//   new UpdateFormDirty({ dirty: false, path: 'auth.loginForm'}),
	// ]);
  }

  login(): void{
    // new SetFormDisabled('auth.loginForm'),
	  this._appStore.dispatch(new ResetAuth()).subscribe(() => {
	    this._appStore.dispatch(new Login(this.loginForm.value));
	    // this._appStore.dispatch(new UpdateFormDirty({ dirty: false, path: 'auth.loginForm'}));
	  }); 
	   this._loginRef.close();
  }

}
