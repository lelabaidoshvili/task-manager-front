import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
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
  myProjects: Project[] = [];
  sub$ = new Subject<any>();
  task = '';
  myBoard: BoardResponse[] = [];
  myIssue: IssueTypeResponse[] = [];

  constructor(
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private IssueTypeFacadeService: IssueTypeFacadeService,
    private router: Router,
    private stepperService: StepperService
  ) {}

  ngOnInit(): void {
    this.IssueTypeFacadeService.getIssueTypes()
      .pipe(
        takeUntil(this.sub$),
        map((issues) => (this.myIssue = issues)),
        switchMap(() => this.boardFacadeService.getBoards())
      )
      .subscribe((boards) => {
        console.log(boards);
        this.myBoard = boards;
      });

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
  }

  openBoardForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(1);
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
