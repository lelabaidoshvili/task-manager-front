import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';
import { map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { StepperService } from '../stepper/stepper.service';

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

  myProjects: Project[] = [];
  myBoard: BoardResponse[] = [];
  myIssue: IssueTypeResponse[] = [];
  sub$ = new Subject<any>();
  task = '';

  constructor(
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private IssueTypeFacadeService: IssueTypeFacadeService,
    private router: Router,
    private stepperService: StepperService
  ) {}

  ngOnInit(): void {
    this.projectFacadeService
      .getMyProjects()
      .pipe(
        takeUntil(this.sub$),
        map((projects) => {
          if (projects.length > 0) {
            this.myProjects = projects;

            console.log('My Projects');
            console.log(projects);
          }
        }),
        switchMap(() => this.projectFacadeService.current$)
      )
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
      .pipe(
        takeUntil(this.sub$),
        map((issues) => (this.myIssue = issues))
      )
      .subscribe(() => {});
  }

  openBoardForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(1);
    this.boardFacadeService.additional.next(true);
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
