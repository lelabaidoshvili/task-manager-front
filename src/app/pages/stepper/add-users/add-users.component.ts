import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '../stepper.service';
import { UsersFacadeService } from '../../../facades/users-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  usersFormGroup: FormGroup;
  goNextStep: boolean;
  createUser: boolean = false;

  constructor(
    private stepperService: StepperService,
    private usersFacadeService: UsersFacadeService,
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
  }

  saveUser() {
    if (this.usersFormGroup.valid) {
      this.goNextStep = true;
      this.usersFacadeService
        .createUsers(this.usersFormGroup.value)
        .subscribe((res) => {
          this._snackBar.open('User Created', 'Close', { duration: 1000 });
          console.log(res);
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
}
