import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '../stepper.service';
import { UsersFacadeService } from '../../../facades/users-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { Project, ProjectUsers, UsersResponse } from 'src/app/core/interfaces';
import { AuthFacadeService } from '../../auth/auth-facade.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit, OnDestroy {
  usersFormGroup: FormGroup;
  goNextStep: boolean;
  createUser: boolean = false;
  active: boolean = false;
  sub$ = new Subject<any>();
  currentProject?: Project;
  projectUsers = [];

  addedUsers = [];

  constructor(
    private stepperService: StepperService,
    private usersFacadeService: UsersFacadeService,
    private projectFacadeService: ProjectFacadeService,
    private authFacadeService: AuthFacadeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersFormGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
    });
    this.goNextStep = false;

    this.projectUsers.push(this.authFacadeService.user);
  }

  saveUser() {
    if (this.usersFormGroup.valid) {
      this.goNextStep = true;
      this.usersFacadeService
        .createUsers(this.usersFormGroup.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          console.log('user response');
          console.log(res);
          this.currentProject = this.projectFacadeService.getProject();
          this.setProjectUsers(res);
          this.getProjectUsers();

          this._snackBar.open('User Created', 'Close', { duration: 1000 });

          this.createUser = false;
        });
    }
    this.usersFormGroup.reset();
  }

  toggleUserForm() {
    this.createUser = !this.createUser;
    this.goNextStep = false;
  }
  submit() {
    if (this.goNextStep) {
      this.stepperService.goToStep(4);
    }
  }

  setProjectUsers(res: UsersResponse) {
    this.addedUsers.push(`${res.id}`);
    this.projectFacadeService
      .addUsersToProject({
        projectId: this.currentProject.id,
        userIds: [`${this.authFacadeService.user.id}`, ...this.addedUsers],
      })
      .pipe(takeUntil(this.sub$))
      .subscribe();
  }

  getProjectUsers() {
    this.projectFacadeService
      .getProjectUsers$()
      .pipe(takeUntil(this.sub$))
      .subscribe((users) => {
        this.projectUsers = users;
      });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
