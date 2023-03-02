import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil, switchMap} from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacadeService } from '../auth-facade.service';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import {tap, map} from "rxjs";
import {AuthResponse} from "../../../core/interfaces";
import {CookieStorageService} from "../../../core/services/cookie.service";
import {RoleHttpService} from "../../../core/services/role-http.service";

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
    private projectFacadeService: ProjectFacadeService,
    private readonly fb: NonNullableFormBuilder,
    private cookieService: CookieStorageService,
    private roleService: RoleHttpService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onSignIn()
  }

  public onSignIn(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.saveRoles()
    this.authFacadeService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.navigateToPages();
        console.log(res);
      });
  }

  saveRoles() {
    this.authFacadeService.login(this.loginForm.value)
      .pipe(
        tap((res: AuthResponse) => {
          const roles = res.user.roles.map((r: any) => r.name);
          this.cookieService.setCookie('roles', JSON.stringify(roles), );
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        }),
        switchMap(() => this.roleService.getMyRole()
          .pipe(
            map((res: any) => {
              const permissions: string[] = [];
              res.forEach((r: any) => {
                r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
              });
              localStorage.setItem('permissions', JSON.stringify(permissions));
            })
          )
        )
      )
      .subscribe();
  }
  navigateToPages() {
    this.projectFacadeService.getMyProjects().subscribe((projects) => {
      if (projects.length > 0) {
        this.router.navigate(['/task']);
      } else {
        this.router.navigate(['/stepper']);
      }
    });
  }
  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
