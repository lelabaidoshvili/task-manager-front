import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Project } from 'src/app/core/interfaces';
import { ProjectFacadeService } from 'src/app/facades/project.facade.service';
import { StepperService } from '../stepper.service';
import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  stepperService: StepperService = inject(StepperService);
  createProjectService: CreateProjectService = inject(CreateProjectService);

  projectFormGroup: FormGroup;
  sub$ = new Subject<any>();
  updateState: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectFacadeService: ProjectFacadeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.projectFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      abbreviation: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: any) => {
          if (params['id']) {
            this.updateState = true;
            return this.projectFacadeService.getProjectById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('project by id');
        console.log(response);

        if (response) {
          this.projectFormGroup.patchValue({
            id: response.id,
            ...response,
          });
        }
      });
  }

  submit() {
    this.projectFormGroup.markAllAsTouched();
    if (this.projectFormGroup.invalid) return;

    if (!this.projectFormGroup.value.id) {
      this.createProjectService
        .createProject(this.projectFormGroup.value)
        .pipe(
          takeUntil(this.sub$),
          tap((res) => this.projectFacadeService.setProject(res.id)),
          switchMap(() => this.projectFacadeService.getOnlyMyProjects$())
        )
        .subscribe((response) => {
          this._snackBar.open('Project Created', 'Close', { duration: 1000 });
          console.log(response);
        });

      this.stepperService.goToStep(1);
    } else {
      console.log('Data from form:');
      console.log(this.projectFormGroup.value);

      this.projectFacadeService
        .updateProject(
          this.projectFormGroup.value.id,
          this.projectFormGroup.value
        )
        .pipe(
          takeUntil(this.sub$),
          tap((res) => this.projectFacadeService.setProject(res.id)),
          switchMap(() => this.projectFacadeService.getOnlyMyProjects$())
        )
        .subscribe((response) => {
          console.log('updated project:');
          console.log(response);
        });

      this.router.navigate(['/tables']);
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
