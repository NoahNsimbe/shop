import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login, Register, ResetAuth } from '../auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  randomString: string;

  constructor(private fb: FormBuilder, private _appStore: Store) {

    this.randomString = this.makeRandom(10, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

    this.loginForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.registerForm = this.fb.group({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      username: new FormControl(this.randomString, [Validators.minLength(5), Validators.required]),
      password: new FormControl("", [Validators.minLength(5), Validators.required]),
      phone: new FormControl(""),
    });

   }

  ngOnInit() {
  }

  login(): void{
      this._appStore.dispatch(new ResetAuth()).subscribe(() => {
        this._appStore.dispatch(new Login(this.loginForm.value));
      });
      
  }

  register(): void{
      this._appStore.dispatch(new ResetAuth()).subscribe(() => {
        this._appStore.dispatch(new Register({user: this.registerForm.value}));  
      });
        
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }


}
