import { Injectable } from '@angular/core';
import { Project } from '../core/interfaces';
import { ProjectHttpService } from '../core/services/project-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectFacadeService {
  constructor(private projectHttpService: ProjectHttpService) {}

  setProject(project: Project): void {
    if (project) {
      localStorage.setItem('project', JSON.stringify(project));
    }
  }

  getProject(): Project {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;
  }

  getProjects() {
    return this.projectHttpService.getAllProjects();
  }
}
