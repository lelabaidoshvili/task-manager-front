import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project.interface';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit, OnDestroy {
  allProjects: Project[] = [];
  displayedColumns: string[] = [
    'name',
    'description',
    // 'boards',
    'users',
    'actions',
  ];

  sub$ = new Subject();

  constructor(
    private projectFacadeService: ProjectFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectFacadeService
      .getMyProjects()
      .pipe(takeUntil(this.sub$))
      .subscribe((projects) => {
        console.log(projects);
        this.allProjects = projects;
      });
  }

  updateProject(id: number) {
    this.router.navigate([`stepper/projects/edit/${id}`]);
  }

  deleteProject(id: number) {
    this.projectFacadeService.deleteProject(id).subscribe((res) => {
      console.log(res);
      this.projectFacadeService
        .getProjects()
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          this.allProjects = res;
        });
    });
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
