import { Component, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { map } from 'rxjs';
import { Project } from 'src/app/core/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  myProjects: Project[] = [];
  myLastProject: Project;
  task = '';


  constructor(
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,

  ) {}





  ngOnInit(): void {
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
