import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private router: Router,private authService: AuthService, private readonly fb: NonNullableFormBuilder) {
    this.loginForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  public onSignIn (): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return

    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res)

      this.router.navigate(['/'])
    })
  }
  public onSignUp(): void {
    if(this.loginForm.invalid) {
      this.router.navigate(['/auth/register'])
    }

  }

}
