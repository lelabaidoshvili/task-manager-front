import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  stepperService: StepperService = inject(StepperService);

  projectFormGroup: FormGroup;

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
    if (!this.projectFormGroup.invalid) {
      this.stepperService.goToStep(1);
      console.log(this.projectFormGroup.value);
    }
  }
}
