import { Injectable } from '@angular/core';

import { Project } from 'src/app/core/interfaces';
import { ProjectHttpService } from 'src/app/core/services/project-http.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService extends ProjectHttpService {
  override createProject(payload: Project) {
    return super.createProject(payload);
  }
}
