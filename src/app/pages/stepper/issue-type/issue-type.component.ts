import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssueTypeEnum } from 'src/app/core/enums/issue-type.enum';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';

import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss'],
})
export class IssueTypeComponent implements OnInit {
  stepperService: StepperService = inject(StepperService);

  issues = IssueTypeEnum;
  issueEnum = [];
  issueTypeFormGroup: FormGroup;
  columnGroup: FormGroup;
  icons: string[] = [
    'assets/images/Bug.png',
    'assets/images/Task.png',
    'assets/images/Sub-Task.png',
    'assets/images/Spike.png',
    'assets/images/Task.png',
    'assets/images/Task.png',
  ];
  goNextStep: boolean;
  createIssueType: boolean = false;

  constructor(
    private issueTypeFacadeService: IssueTypeFacadeService,
    private _snackBar: MatSnackBar
  ) {
    this.issueEnum = Object.keys(this.issues);
  }

  ngOnInit(): void {
    console.log(this.issueEnum);
    this.issueTypeFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      // isActive: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      issueTypeColumns: new FormArray([]),
    });
  }

  get issueTypeColumnArray() {
    return <FormArray>this.issueTypeFormGroup.get('issueTypeColumns');
  }

  addIssueTypeColumn() {
    this.columnGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      filedName: new FormControl(null, Validators.required),
      // isRequired: new FormControl(null, Validators.required),
      // issueTypeId: new FormControl(null, Validators.required),
    });
    this.issueTypeColumnArray.push(this.columnGroup);
  }

  deleteInputsRow(index: number) {
    this.issueTypeColumnArray.removeAt(index);
  }

  toggleIssueForm() {
    this.createIssueType = !this.createIssueType;
    this.goNextStep = false;
  }

  saveIssueType() {
    this.issueTypeFormGroup.markAllAsTouched();
    if (this.issueTypeFormGroup.invalid) return;

    if (this.issueTypeFormGroup.valid) {
      this.goNextStep = true;
      this.issueTypeFacadeService
        .createIssueType(this.issueTypeFormGroup.value)
        .subscribe((res) => {
          this._snackBar.open('IssueType Created', 'Close', { duration: 1000 });
          this.createIssueType = false;
          console.log(res);
        });
    }
    this.issueTypeFormGroup.reset();
  }
  submit() {
    this.stepperService.goToStep(3);
  }
}
