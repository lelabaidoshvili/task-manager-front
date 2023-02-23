import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { TaskStatus } from 'src/app/core/enums/taskStatus.enum';
import { BoardResponse } from 'src/app/core/interfaces';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { DialogComponent } from '../dialog/dialog';
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
  active: boolean = false;

  goNextStep: boolean;
  createBoard: boolean = false;
  myBoards: BoardResponse[] = [];

  boardFormGroup: FormGroup;
  columnGroup: FormGroup;

  additionalBoard: boolean = false;

  sub$ = new Subject<any>();
  constructor(
    private boardFacadeService: BoardFacadeService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public matDialog: MatDialog
  ) {
    this.taskEnum = Object.keys(this.tasks);
  }

  ngOnInit(): void {
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

    this.boardFacadeService.additional$.subscribe((res) => {
      this.additionalBoard = res;
      console.log(res);
      console.log(this.additionalBoard);
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
  toggleForm() {
    this.goNextStep = false;
    this.createBoard = !this.createBoard;
  }
  saveBoard() {
    this.boardFormGroup.markAllAsTouched();
    if (this.boardFormGroup.invalid) return;

    if (!this.boardFormGroup.value.id) {
      this.boardFacadeService
        .createBoard(this.boardFormGroup.value)
        .pipe(
          takeUntil(this.sub$),
          switchMap(() => this.boardFacadeService.getMyBoards$())
        )
        .subscribe((res) => {
          this.active = true;
          this.myBoards = res;
          this._snackBar.open('Board Created', 'Close', { duration: 1000 });
          setTimeout(() => {
            this.active = false;
            if (this.additionalBoard) {
              // this.router.navigate(['/task']);
              this.openDialog();
            }
            this.goNextStep = true;
          }, 3000);

          this.createBoard = false;
          this.boardFormGroup.reset();
        });
    } else {
      this.boardFacadeService
        .updateBoardById(
          this.boardFormGroup.value.id,
          this.boardFormGroup.value
        )
        .pipe(takeUntil(this.sub$))
        .subscribe((response: BoardResponse) => {
          this.goNextStep = true;
          this.createBoard = false;
          this.boardFormGroup.reset();

          console.log('updated Board:');
          console.log(response);
        });

      this.router.navigate(['/tables']);
    }
  }

  toggleBoardForm() {
    this.createBoard = !this.createBoard;
    this.goNextStep = false;
  }

  submit() {
    this.stepperService.goToStep(2);
  }

  openDialog() {
    let dialogRef = this.matDialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/task']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
