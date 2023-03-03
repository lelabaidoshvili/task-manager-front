import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Project, ProjectUsers, UsersResponse } from '../core/interfaces';

import { ProjectHttpService } from '../core/services/project-http.service';


@Injectable({
  providedIn: 'root',
})
export class ProjectFacadeService {
  myProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  projects$ = this.myProjects.asObservable();
  myUsers: BehaviorSubject<UsersResponse[]> = new BehaviorSubject<
    UsersResponse[]
  >([]);

  users$ = this.myUsers.asObservable();
  //--------------
  current: BehaviorSubject<Project> = new BehaviorSubject<Project>(
    this.getProject()
  );
  current$ = this.current.asObservable();
  //-------------

  activateCurrent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  constructor(private projectHttpService: ProjectHttpService) {}

  setProject(projectId: number): void {
    this.projectHttpService
      .getProjectById(projectId)
      .pipe(tap((res) => this.current.next(res)))
      .subscribe((project: Project) => {
        localStorage.setItem('project', JSON.stringify(project));
        this.activateCurrent.next(true);
      });
  }

  getProject(): Project {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;
  }

  //needs to be changed ,change into getOnlyMyProjects$()
  getMyProjects() {
    return this.projectHttpService.getMyProjects();
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

  getOnlyMyProjects$(): Observable<Project[]> {
    return this.projectHttpService
      .getMyProjects()
      .pipe(tap((projects) => this.myProjects.next(projects)));
  }

  getProjectUsers$(): Observable<UsersResponse[]> {
    return this.projectHttpService.getProjectUsers().pipe(
      tap((projectUsers) => {
        this.myUsers.next(projectUsers);
      })
    );
  }


  addUsersToProject(payload: ProjectUsers) {
    return this.projectHttpService.addUsersToProject(payload);
  }

}
