import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private readonly fb: NonNullableFormBuilder) {
    this.registrationForm = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public onSignUp() {
    this.authService.signUp(this.registrationForm.value).subscribe(() => {
      console.log(this.registrationForm.value)
    })

  }
  public onSignIn() {
    this.router.navigate(['/auth/login'])
  }

  ngOnInit() {
    this.registrationForm.get('password')?.valueChanges.subscribe((pas) => {
      const confirmPas = this.registrationForm.get('confirmPassword')?.value;
      if (pas && confirmPas && pas !== confirmPas) {
        this.registrationForm.get('confirmPassword')?.setErrors({notMatch: true})
      } else {
        this.registrationForm.get('confirmPassword')?.setErrors(null);
      }
    })

    this.registrationForm.get('confirmPassword')?.valueChanges.subscribe((pas) => {
      const confirmPas = this.registrationForm.get('password')?.value;
      if (pas && confirmPas && pas !== confirmPas) {
        this.registrationForm.get('confirmPassword')?.setErrors({notMatch: true})
      } else {
        this.registrationForm.get('confirmPassword')?.setErrors(null);
      }
    })
  }

}
