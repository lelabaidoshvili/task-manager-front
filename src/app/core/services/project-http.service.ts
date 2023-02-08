import { Injectable } from '@angular/core';

import { Project } from '../interfaces';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {
  createProject(payload: Project):Observable<Project> {
    return this.post<Project>('project', payload);
  }

  createUserProject(payload: Project): Observable<Project> {
    return this.post<Project>('project/users', payload)
  }
  update(id: string, project: Project): Observable<Project> {
    return this.put<Project>(`project/${id}`, project);
  }
  deleteProject(id: string): Observable<Project> {
    return this.delete<Project>(`project/${id}`);
  }
}
