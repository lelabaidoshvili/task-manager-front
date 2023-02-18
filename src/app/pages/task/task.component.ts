import { Component, OnInit} from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { map } from 'rxjs';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { BoardResponse } from 'src/app/core/interfaces';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {


  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  currentProject;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );



  myProjects: Project[] = [];
  myLastProject: Project;
  task = '';
  myBoard: BoardResponse[] = [];
  myIssue: IssueTypeResponse[] = [];




  constructor(
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private IssueTypeFacadeService: IssueTypeFacadeService,


  ) {}

  ngOnInit(): void {
    this.currentProject = this.projectFacadeService.getProject();
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

            this.myLastProject = projects[0];

            console.log('my last project');
            console.log(this.myLastProject);
          }
        })
      )
      .subscribe((projects) => {});
  }



}
