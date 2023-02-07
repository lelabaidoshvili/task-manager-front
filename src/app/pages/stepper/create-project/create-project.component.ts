import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Project } from 'src/app/core/interfaces';
import { StepperService } from '../stepper.service';
import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  stepperService: StepperService = inject(StepperService);
  createProjectService: CreateProjectService = inject(CreateProjectService);

  projectFormGroup: FormGroup;
  sub$ = new Subject<any>();

  constructor() {
    this.projectFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      abbreviation: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  submit() {
    this.projectFormGroup.markAllAsTouched();
    if (this.projectFormGroup.invalid) return;

    this.createProjectService
      .createProject(this.projectFormGroup.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((response: Project) => {
        console.log(response);
      });

    this.stepperService.goToStep(1);
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
