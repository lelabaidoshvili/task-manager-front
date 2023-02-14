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

  getSavedProjects(): Project[] {
    return JSON.parse(localStorage.getItem('user')).projects;
  }


  getProjects() {
    return this.projectHttpService.getAllProjects();
  }

  updateProject(id: number, project: Project) {
    return this.projectHttpService.updateProject(id, project);
  }

  getProjectById(id: number) {
    return this.projectHttpService.getProjectById(id);
  }

  deleteProject(id: number) {
    return this.projectHttpService.deleteProject(id);
  }
}
