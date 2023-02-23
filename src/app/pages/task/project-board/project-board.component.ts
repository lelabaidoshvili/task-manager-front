import { Component, OnDestroy, OnInit } from '@angular/core';

import { BoardResponse, UsersResponse } from '../../../core/interfaces';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/core/enums/task-priority.enum';
import { TaskStatus } from 'src/app/core/enums/taskStatus.enum';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';
import { IssueTypeResponse } from 'src/app/core/interfaces/issuetype.interface';
import { AuthFacadeService } from '../../auth/auth-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  //-----------
  taskFormGroup: FormGroup;
  taskPropertyGroup: FormGroup;
  priority = TaskPriority;
  priorityEnum = [];
  tasks = TaskStatus;
  taskEnum = [];
  sub$ = new Subject<any>();
  myBoards: BoardResponse[] = [];
  activeBoard: BoardResponse;
  activeBoardId: number;
  activeBoardColumns;
  initialColumnId: number;
  reporterId: number;
  assignee: UsersResponse[] = [];
  activeIssues?: IssueTypeResponse[];
  issueTypeColumns;
  taskPropertyArr = [];
  //-----------

  // column: any;

  tasksA: any = {
    365: [
      {
        id: 1,
        title: 'todo1',
      },
      {
        id: 2,
        title: 'todo2',
      },
      {
        id: 3,
        title: 'todo3',
      },
    ],
    379: [],
    380: [],
    381: [],
  };

  constructor(
    private boardFacadeService: BoardFacadeService,
    private route: ActivatedRoute,
    private taskFacadeService: TasksFacadeService,
    private issueTypeFacadeService: IssueTypeFacadeService,
    private authFacadeService: AuthFacadeService,
    private projectFacadeService: ProjectFacadeService,
    public dialog: MatDialog
  ) {
    //------------

    this.priorityEnum = Object.keys(this.priority);
    this.taskEnum = Object.keys(this.tasks);
    //-------------
  }

  ngOnInit(): void {
    this.getBoardById();
    this.getActiveIssues();
    this.getBoards();
    this.reporterId = this.authFacadeService.user.id;
    this.getProjectUsers();

    this.taskFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      issueTypeId: new FormControl(null, Validators.required),
      taskProperty: new FormArray(this.taskPropertyArr),
      // epicId: new FormControl(null, Validators.required),
      boardId: new FormControl(this.activeBoardId, Validators.required),
      boardColumnId: new FormControl(null, Validators.required),
      isBacklog: new FormControl(false, Validators.required),
      priority: new FormControl(null, Validators.required),
      taskStatus: new FormControl(null, Validators.required),
      assigneeId: new FormControl(null, Validators.required),
      reporterId: new FormControl(this.reporterId, Validators.required),
    });

    this.getIssueTypeColumns();
  }

  getIssueTypeColumns() {
    this.taskFormGroup
      ?.get('issueTypeId')
      ?.valueChanges.subscribe((issueId) => {
        console.log(issueId);
        this.issueTypeFacadeService
          .getIssueTypeById(issueId)
          .pipe(takeUntil(this.sub$))
          .subscribe((res) => {
            this.issueTypeColumns = res.issueTypeColumns;
            console.log(this.issueTypeColumns);

            this.issueTypeColumns.forEach((element) => {
              this.taskPropertyGroup = new FormGroup({
                name: new FormControl(element?.name, Validators.required),
                filedName: new FormControl(
                  element?.filedName,
                  Validators.required
                ),
                value: new FormControl(null, Validators.required),
                isRequired: new FormControl(
                  element?.isRequired,
                  Validators.required
                ),
              });
              this.taskPropertyArr.push(this.taskPropertyGroup.value);
              console.log(this.taskPropertyArr);
            });
          });
      });
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
            //-----------------
            // this.boards = board;

            this.activeBoardColumns = this.activeBoard.columns;
            this.initialColumnId = this.activeBoardColumns[0].id;

            console.log(board);
            console.log(' board columns');
            console.log(this.activeBoardColumns);
            console.log(' Initial column id');
            console.log(this.initialColumnId);
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }

  getBoards() {
    this.boardFacadeService
      .getBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe(
        (boards) => {
          // console.log(boards);
          // this.myBoards = boards;
          // this.column = this.activeBoard?.columns;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getActiveIssues() {
    this.issueTypeFacadeService
      .getMyIssueTypes$()
      .pipe(takeUntil(this.sub$))
      .subscribe((issues) => {
        this.activeIssues = issues;

        console.log('issues');

        console.log(this.activeIssues);
      });
  }

  getProjectUsers() {
    this.projectFacadeService
      .getProjectUsers$()
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.assignee = res;
      });
  }

  submit() {
    this.taskFacadeService
      .createTask(this.taskFormGroup.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        console.log(res);
      });
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event);
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
    }
  }
  drop1(event: CdkDragDrop<any, any>) {
    moveItemInArray(
      this.activeBoard.columns,
      event.previousIndex,
      event.currentIndex
    );
  }
  openAddTaskDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
