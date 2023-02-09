import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // stepperService: StepperService = inject(StepperService);

  // boardFormGroup: FormGroup;

  // constructor() {
  //   this.boardFormGroup = new FormGroup({
  //     name: new FormControl(null, Validators.required),
  //     abbreviation: new FormControl(null, Validators.required),
  //   });
  // }

  ngOnInit(): void {}
  // submit() {
  //   if (!this.boardFormGroup.invalid) {
  //     this.stepperService.goToStep(2);
  //   }
  // }
}
