import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login, Register } from '../auth/auth.actions';

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

    this.randomString = "";

    this.loginForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.registerForm = this.fb.group({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      username: new FormControl(this.randomString, [Validators.minLength(9), Validators.required]),
      password: new FormControl("", [Validators.minLength(5), Validators.required]),
      phone: new FormControl("", Validators.required),
    });

   }

  ngOnInit() {
  }

  login(): void{
    if(this.loginForm.valid){
      this._appStore.dispatch(new Login(this.loginForm.value));
    }
    
  }

  register(): void{
    if(this.registerForm.valid){
      this._appStore.dispatch(new Register(this.registerForm.value));
    }
    
  }

}
