import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BoardResponse,
  ColumnResponse,
  Project,
  UsersResponse,
} from '../../../core/interfaces';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';
import { AuthFacadeService } from '../../auth/auth-facade.service';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskInterface } from 'src/app/core/interfaces/task';
import * as _ from 'lodash';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { BoardSelectComponent } from '../board-select/board-select.component';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  currentProject: Project;
  sub$ = new Subject<any>();
  activeBoard: BoardResponse;
  activeBoardId: number;
  activeBoardColumns;
  assignee: UsersResponse[] = [];
  activeTasks;

  constructor(
    private boardFacadeService: BoardFacadeService,
    private route: ActivatedRoute,
    private taskFacadeService: TasksFacadeService,
    private issueTypeFacadeService: IssueTypeFacadeService,
    private authFacadeService: AuthFacadeService,
    private projectFacadeService: ProjectFacadeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.boardFacadeService.update$.subscribe((res) => {
      if (res) {
        this.getBoardById();
      }
    });
    this.getBoardById();
    this.currentProject = this.projectFacadeService.getProject();
    this.getProjectUsers();

    this.getTasks();
  }

  getBoardById() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.activeBoardId = +id;

      this.boardFacadeService
        .getBoardById(id)
        .pipe(takeUntil(this.sub$))
        .subscribe(
          (board) => {
            this.activeBoard = board;
            console.log(board);

            this.activeBoardColumns = this.activeBoard.columns;
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }

  addColumn(id: number) {
    this.router.navigate([`stepper/boards/edit/${id}`]);
  }
  getProjectUsers() {
    this.projectFacadeService
      .getProjectUsers$()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.assignee = res;
      });
  }

  getTasks() {
    this.taskFacadeService
      .getTasks({ boardId: this.activeBoardId })
      .subscribe((tasks) => {
        this.activeTasks = _.groupBy(tasks, 'boardColumnId');
        console.log(this.activeTasks);
      });
  }

  drop(event: CdkDragDrop<any>, column: ColumnResponse) {
    console.log(event.container);
    console.log(column);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const tasks = event.container.data.map(
        (task: TaskInterface, index: number) => {
          return {
            ...task,
            taskStatus: column.taskStatus,
            boardColumnId: column.id,
          };
        }
      );
      console.log(tasks);
      this.activeTasks[column.id] = tasks;
      console.log(this.activeTasks);

      const currentTask = tasks[event.currentIndex];
      console.log(currentTask);
      this.taskFacadeService
        .updateTaskById(currentTask.id, currentTask)
        .subscribe((task) => {
          console.log(task);
          this.getTasks();
        });
    }
  }

  addTask(column) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: {
        boardId: this.activeBoardId,
        column: column,
      },
    });

    dialogRef.afterClosed().subscribe((task) => {
      console.log('The dialog was closed');
      if (task) {
        this.getTasks();
      }
    });
  }

  viewTask(task, column) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.data = {
      boardId: this.activeBoardId,
      column: column,
      taskId: task.id,
    };
    const dialogRef = this.dialog.open(
      AddTaskComponent,
      dialogConfig
      //    {
      //   width: '600px',
      //   data: {
      //     boardId: this.activeBoardId,
      //     column: column,
      //     taskId: task.id,
      //   },
      // }
    );

    dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        this.getTasks();
      }
    });
  }

  deleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.taskFacadeService.deleteTaskById(taskId);
          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.getTasks();
        }
      });
  }

  selectOtherBoards() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '700px';
    dialogConfig.height = '600px';
    dialogConfig.panelClass = 'dialog-container';

    const dialogRef = this.dialog.open(BoardSelectComponent, dialogConfig);
    dialogRef.componentInstance.dialogRef = dialogRef;
    // dialogRef.afterClosed().subscribe((res) => {
    //   console.log('The dialog was closed');
    // });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
