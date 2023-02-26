import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/core/enums/task-priority.enum';
import { TaskStatus } from 'src/app/core/enums/taskStatus.enum';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
  BoardResponse,
  ColumnResponse,
  UsersResponse,
} from 'src/app/core/interfaces';
import { IssueTypeResponse } from 'src/app/core/interfaces/issuetype.interface';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';
import { AuthFacadeService } from '../../auth/auth-facade.service';
import { ActivatedRoute } from '@angular/router';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { TaskProperty } from 'src/app/core/interfaces/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskFormGroup: FormGroup;
  taskPropertyGroup: FormGroup;
  priority = TaskPriority;
  priorityEnum = [];
  tasks = TaskStatus;
  taskEnum = [];
  sub$ = new Subject<any>();
  assignee: UsersResponse[] = [];
  activeIssues?: IssueTypeResponse[];
  activeBoardColumns;
  reporterId: number;

  constructor(
    private taskFacadeService: TasksFacadeService,
    private issueTypeFacadeService: IssueTypeFacadeService,
    private authFacadeService: AuthFacadeService,
    private boardFacadeService: BoardFacadeService,
    private projectFacadeService: ProjectFacadeService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      taskId: number;
      boardId: number;
      column: ColumnResponse;
    }
  ) {
    this.priorityEnum = Object.keys(this.priority);
    this.taskEnum = Object.keys(this.tasks);
  }

  ngOnInit(): void {
    this.getActiveIssues();
    this.getProjectUsers();
    this.reporterId = this.authFacadeService.user.id;

    if (this.data.taskId) {
      this.getTask(this.data.taskId);
    } else {
      this.taskFormGroup
        ?.get('issueTypeId')
        .valueChanges.pipe(takeUntil(this.sub$))
        .subscribe((issueTypeId) => {
          this.getIssueTypeProperties(issueTypeId);
        });
    }

    if (this.data.boardId) {
      this.taskFormGroup?.patchValue({ boardId: this.data.boardId });
    }

    if (this.data.column) {
      this.taskFormGroup?.patchValue({
        boardColumnId: this.data.column.id,
      });
    }

    this.taskFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      issueTypeId: new FormControl(null, Validators.required),
      taskProperty: new FormArray([]),
      // epicId: new FormControl(null),
      boardId: new FormControl(this.data.boardId, Validators.required),
      boardColumnId: new FormControl(this.data.column.id, Validators.required),
      isBacklog: new FormControl(false, Validators.required),
      priority: new FormControl(null, Validators.required),
      taskStatus: new FormControl(
        this.data.column.taskStatus,
        Validators.required
      ),
      assigneeId: new FormControl(null, Validators.required),
      reporterId: new FormControl(this.reporterId, Validators.required),
    });
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

  get taskProperty() {
    return this.taskFormGroup?.get('taskProperty') as FormArray;
  }

  getIssueTypeProperties(issueTypeId: number) {
    this.issueTypeFacadeService
      .getIssueTypeById(issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.taskProperty.clear();
        res.issueTypeColumns.forEach((property) => {
          this.taskProperty.push(
            new FormGroup({
              id: new FormControl(property.id),
              name: new FormControl(property.name),
              filedName: new FormControl(property.filedName),
              // value: new FormControl(null),
              isRequired: new FormControl(property.isRequired),
            })
          );
        });
      });
  }

  private getTask(taskId: number) {
    this.taskFacadeService
      .getTaskById(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.taskFormGroup.patchValue(res);
        res.taskProperty.forEach((property) => {
          this.taskProperty.push(
            new FormGroup({
              id: new FormControl(property.id),
              name: new FormControl(property.name),
              filedName: new FormControl(property.filedName),
              // value: new FormControl(property.value),
              isRequired: new FormControl(property.isRequired),
            })
          );
        });
      });
  }

  submit() {
    console.log(this.taskFormGroup.value);
    this.taskFormGroup?.markAllAsTouched();
    if (this.taskFormGroup?.invalid) return;

    if (!this.data.taskId) {
      this.taskFacadeService
        .createTask(this.taskFormGroup.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((task) => {
          console.log(task);
          this.dialogRef.close(task);
        });
    } else {
      this.taskFacadeService
        .updateTaskById(this.data.taskId, this.taskFormGroup.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((task) => {
          this.dialogRef.close(task);
        });
    }
  }
}
