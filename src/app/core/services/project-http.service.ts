import { Injectable } from '@angular/core';

import { Project } from '../interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService extends BaseService {
  createProject(payload: Project) {
    return this.post<Project>('project', payload);
  }
}
