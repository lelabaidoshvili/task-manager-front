import { Injectable } from '@angular/core';

import { Project, ProjectDeleteResponse } from '../interfaces';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {
  createProject(payload: Project): Observable<Project> {
    return this.post<Project>('project', payload);
  }

  addProjectToUsers(payload: Project): Observable<Project> {
    return this.post<Project>('project/users', payload);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.put<Project>(`project/${id}`, project);
  }

  deleteProject(id: number): Observable<ProjectDeleteResponse> {
    return this.delete<ProjectDeleteResponse>(`project/${id}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/all');
  }

  // getProject(): Observable<Project> {
  //   return this.get<Project>('project');
  // }

  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`project/${id}`);
  }
}
