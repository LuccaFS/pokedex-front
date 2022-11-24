import { NewUser } from './../../interfaces/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  public registerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      passwordConfirm: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });


  }

  createUser(){
    let pass = this.registerForm.controls['password'].value;
    let confirmPass = this.registerForm.controls['passwordConfirm'].value;

    if(pass == confirmPass){
      let newUser: NewUser = {
      dsName: this.registerForm.controls['name'].value,
      dsEmail: this.registerForm.controls['email'].value,
      dsPassword: this.registerForm.controls['password'].value
      }

      this.store.dispatch(AuthActions.register({newUser}));
    }else{
      alert("Confirm password doesn't match password.")
    }

  }

}
