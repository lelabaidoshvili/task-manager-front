import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './feature/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'stepper',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/stepper/stepper.module').then((m) => m.StepperModule),
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/tables/projects-table/projects-table.module').then(
            (m) => m.ProjectsTableModule
          ),
      },
      {
        path: 'task',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/task/task.module').then(
            (m) => m.TaskModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
