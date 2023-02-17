import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IssueTypeEnum } from 'src/app/core/enums/issue-type.enum';
import { IssueTypeResponse } from 'src/app/core/interfaces/issuetype.interface';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';

import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss'],
})
export class IssueTypeComponent implements OnInit, OnDestroy {
  stepperService: StepperService = inject(StepperService);

  issues = IssueTypeEnum;
  issueEnum = [];
  sub$ = new Subject<any>();
  active: boolean = false;
  issueTypes: IssueTypeResponse[] = [];

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
      this.issueTypeFacadeService
        .createIssueType(this.issueTypeFormGroup.value)
        .pipe(
          takeUntil(this.sub$),
          switchMap(() => this.issueTypeFacadeService.getMyIssueTypes$())
        )
        .subscribe((res) => {
          this.active = true;
          this.issueTypes = res;
          this._snackBar.open('Issue Created', 'Close', { duration: 1000 });
          setTimeout(() => {
            this.active = false;
            this.goNextStep = true;
          }, 3000);

          this.createIssueType = false;
        });
    }
    this.issueTypeFormGroup.reset();
  }
  submit() {
    this.stepperService.goToStep(3);
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
