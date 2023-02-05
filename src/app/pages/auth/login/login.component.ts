import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  sub$ = new Subject();
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService,
    private readonly fb: NonNullableFormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public onSignIn(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.authFacadeService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        console.log(res);

        this.router.navigate(['/stepper']);
      });
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
