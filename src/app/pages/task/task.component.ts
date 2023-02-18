import { Component, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StepperService } from '../stepper/stepper.service';
import { takeUntil } from 'rxjs-compat/operator/takeUntil';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
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
    this.projectFacadeService.current$.subscribe((res) => {
      this.currentProject = res;

      console.log(res);

      console.log(this.currentProject);
    });

    this.IssueTypeFacadeService.getIssueTypes().subscribe((Issue) => {
      console.log(Issue);
      this.myIssue = Issue;
    });

    this.boardFacadeService.getBoards().subscribe((Board) => {
      console.log(Board);
      this.myBoard = Board;
    });

    this.projectFacadeService
      .getMyProjects()
      .pipe(
        map((projects) => {
          if (projects.length > 0) {
            this.myProjects = projects;
            console.log('my projects');
            console.log(projects);
          }
        })
      )
      .subscribe((projects) => {});
  }

  openBoardForm() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(1);
  }
}
