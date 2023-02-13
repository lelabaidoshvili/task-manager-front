import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { TaskStatus } from 'src/app/core/enums/taskStatus.enum';
import { BoardResponse } from 'src/app/core/interfaces';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  stepperService: StepperService = inject(StepperService);
  update: boolean = false;
  tasks = TaskStatus;
  taskEnum = [];

  boardFormGroup: FormGroup;
  columnGroup: FormGroup;
  sub$ = new Subject<any>();
  constructor(
    private boardFacadeService: BoardFacadeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskEnum = Object.keys(this.tasks);
  }

  ngOnInit(): void {
    console.log(this.taskEnum);
    this.boardFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      columns: new FormArray([
        new FormGroup({
          name: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required),
          position: new FormControl(null, Validators.required),
          // boardId: new FormControl(null, Validators.required),
          taskStatus: new FormControl(null, Validators.required),
        }),
      ]),
    });

    this.route.params
      .pipe(
        switchMap((params: any) => {
          if (params['id']) {
            this.update = true;
            return this.boardFacadeService.getBoardById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('board by id');
        console.log(response);

        if (response) {
          this.boardFormGroup.patchValue({
            id: response.id,
            ...response,
          });
        }
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
      // boardId: new FormControl(null, Validators.required),
      taskStatus: new FormControl(null, Validators.required),
    });
    this.boardColumnArray.push(this.columnGroup);
  }

  deleteInputsRow(index: number) {
    this.boardColumnArray.removeAt(index);
  }

  submit() {
    this.boardFormGroup.markAllAsTouched();
    if (this.boardFormGroup.invalid) return;

    if (!this.boardFormGroup.value.id) {
      this.boardFacadeService
        .createBoard(this.boardFormGroup.value)
        .subscribe((res) => {
          console.log(res);
          console.log(this.boardColumnArray);
        });
      this.stepperService.goToStep(2);
    } else {
      console.log('Data from board form:');
      console.log(this.boardFormGroup.value);

      this.boardFacadeService
        .updateBoardById(
          this.boardFormGroup.value.id,
          this.boardFormGroup.value
        )
        .pipe(takeUntil(this.sub$))
        .subscribe((response: BoardResponse) => {
          console.log('updated Board:');
          console.log(response);
        });

      this.router.navigate(['/tables']);
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
