import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';
import { map, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { StepperService } from '../stepper/stepper.service';
import { UsersFacadeService } from 'src/app/facades/users-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );

  currentProject: Project;
  currentBoards: BoardResponse[];
  projectUsers = [];

  // myBoard: BoardResponse[] = [];
  myIssue: IssueTypeResponse[] = [];

  sub$ = new Subject<any>();
  task = '';

  number = 0;

  constructor(
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private IssueTypeFacadeService: IssueTypeFacadeService,
    private router: Router,
    private stepperService: StepperService,
    private usersFacadeService: UsersFacadeService
  ) {}

  ngOnInit(): void {
    this.projectFacadeService.current$
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.currentProject = res;
        console.log(res);
        console.log(this.currentProject);
      });

    this.projectFacadeService.activateCurrent.subscribe((res) => {
      if (res) {
        this.boardFacadeService
          .getMyBoards$()
          .pipe(takeUntil(this.sub$))

          .subscribe((boards) => {
            this.currentBoards = boards;
          });
      }
    });
    this.projectFacadeService.activateCurrent.subscribe((res) => {
      if (res) {
        this.projectFacadeService
          .getProjectUsers$()
          .pipe(takeUntil(this.sub$))
          .subscribe((users) => {
            this.projectUsers = users;
            console.log(users);
          });
      }
    });

    this.IssueTypeFacadeService.getIssueTypes()
      .pipe(takeUntil(this.sub$))
      .subscribe((issues) => {
        this.myIssue = issues;
      });
  }

  openBoardForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(1);
    this.boardFacadeService.additional.next(true);
  }

  openUserForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(3);
    this.usersFacadeService.additionalUser.next(true);
  }

  goToBoard() {
    if (this.currentBoards.length > 1) {
      this.router.navigate(['/task/board-select']);
    } else {
      this.router.navigate(['/task/add-task']);
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
