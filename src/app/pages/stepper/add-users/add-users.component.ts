import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {StepperService} from "../stepper.service";
import {UsersFacadeService} from "../../../facades/users-facade.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  usersFormGroup: FormGroup;
  constructor(private stepperService: StepperService, private usersFacadeService: UsersFacadeService) { }

  ngOnInit(): void {
    this.usersFormGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
    });
  }
  addUser() {
    if (!this.usersFormGroup.invalid) {
      this.stepperService.goToStep(2);
      this.usersFacadeService
        .createUsers(this.usersFormGroup.value)
        .subscribe((res) => {
          console.log(res);

        })
    }
  }
  submit() {
    if (!this.usersFormGroup.invalid) {
      this.stepperService.goToStep(3);
      // this.usersFacadeService
      //   .createUsers(this.usersFormGroup.value)
      //   .subscribe((res) => {
      //     console.log(res);
      this.stepperService.goToStep(4)


    }
  }

}
