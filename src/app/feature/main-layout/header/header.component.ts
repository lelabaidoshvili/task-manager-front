import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/interfaces';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authFacadeService: AuthFacadeService = inject(AuthFacadeService);

  currentProject?: Project = this.projectFacadeService.getProject();

  projects$ = this.projectFacadeService.projects$;

  get loggedIn() {
    return this.authFacadeService.token;
  }

  constructor(
    private router: Router,
    private projectFacadeService: ProjectFacadeService
  ) {}

  ngOnInit(): void {
    this.getMyProjects();
  }

  public signOut(): void {
    this.authFacadeService.signOut();

    this.router.navigate(['/']);
  }

  selectProject(projectId: number) {
    this.projectFacadeService.setProject(projectId);
  }
  getMyProjects() {
    this.projectFacadeService.getOnlyMyProjects$().subscribe();
  }
}
