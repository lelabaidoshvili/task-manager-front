import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NonNullableFormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup
  constructor(private readonly fb: NonNullableFormBuilder) {
    this.registrationForm = fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
    });
  }



  public onSignUp() {

  }
}
