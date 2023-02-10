import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { StepperService } from '../stepper.service';
import {BoardService} from "../../../core/services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  stepperService: StepperService = inject(StepperService);
  boardFormGroup: FormGroup;



  constructor(
    private boardService: BoardService
  )
  {
    this.boardFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      column: new FormControl(null, Validators.required )
    });

  }

  ngOnInit(): void {}



  submit() {
    if (!this.boardFormGroup.invalid) {
      this.stepperService.goToStep(2);
      this.boardService.createBoard(this.boardFormGroup.value).subscribe(() => {
        console.log(this.boardFormGroup.value)
      })
    }
  }

}
