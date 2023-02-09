import { Injectable } from '@angular/core';

import { Project } from '../interfaces';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {
  createProject(payload: Project): Observable<Project> {
    return this.post<Project>('project', payload);
  }

  getAllProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/all');
  }
}
