import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/core/enums/issue-type.enum';

import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  stepperService: StepperService = inject(StepperService);

  displayedColumns: string[] = ['first'];
  tasks = TaskStatus;
  taskEnum = [];

  boardFormGroup: FormGroup;
  columnGroup: FormGroup;

  constructor(private boardFacadeService: BoardFacadeService) {
    this.taskEnum = Object.keys(this.tasks);
  }

  ngOnInit(): void {
    console.log(this.taskEnum);
    this.boardFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      columns: new FormArray([]),
    });
  }

  get boardColumnArray() {
    return <FormArray>this.boardFormGroup.get('columns');
  }

  addColumn() {
    this.columnGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      boardId: new FormControl(null, Validators.required),
      taskStatus: new FormControl(null, Validators.required),
    });
    this.boardColumnArray.push(this.columnGroup);
  }

  submit() {
    if (!this.boardFormGroup.invalid) {
      this.stepperService.goToStep(2);
      this.boardFacadeService
        .createBoard(this.boardFormGroup.value)
        .subscribe((res) => {
          console.log(res);
          console.log(this.boardColumnArray);
        });
    }
  }
}
