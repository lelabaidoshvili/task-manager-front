import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BoardResponse, Project } from 'src/app/core/interfaces';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';
import { StepperService } from 'src/app/pages/stepper/stepper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authFacadeService: AuthFacadeService = inject(AuthFacadeService);
  //--
  currentProject?: Project = this.projectFacadeService.getProject();
  // currentProject?: Project = this.projectFacadeService.current.getValue();
  //--
  currentBoards: any;

  projects$ = this.projectFacadeService.projects$;
  currentUser;

  toggle: boolean = false;

  get loggedIn() {
    return this.authFacadeService.token;
  }

  constructor(
    private router: Router,
    private projectFacadeService: ProjectFacadeService,
    private boardFacadeService: BoardFacadeService,
    private stepperService: StepperService,

    private route: ActivatedRoute
  ) {
    this.toggle = false;
  }

  ngOnInit(): void {
    this.getMyProjects();
    this.currentUser = this.authFacadeService.user;
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

  goToStepper() {
    this.router.navigate(['/stepper']);
    this.stepperService.goToStep(0);
  }

  //--
  toggleMenu() {
    this.toggle = !this.toggle;
  }
  //--

  ngOnDestroy() {}
}
