import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/interfaces/project.interface';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit {
  allProjects: Project[] = [];
  displayedColumns: string[] = [
    'id',
    'color',
    'name',
    'abbr',
    'description',
    'actions',
  ];

  constructor(private projectFacadeService: ProjectFacadeService) {}

  ngOnInit(): void {
    this.projectFacadeService.getProjects().subscribe((projects) => {
      console.log(projects);
      this.allProjects = projects;
    });
  }
}
