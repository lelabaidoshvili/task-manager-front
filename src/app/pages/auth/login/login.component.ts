import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private readonly fb: NonNullableFormBuilder) {
    this.loginForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public onSignIn (): void {

  }

}
