import { Injectable } from '@angular/core';
import {Project} from "../core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacadeService {


  setProject(project: Project): void {
    if(project) {
      localStorage.setItem('project', JSON.stringify(project))
    }
  }

  getProject(): Project {
   const project = localStorage.getItem('project')
    return project ? JSON.parse(project) : null;
  }
}
