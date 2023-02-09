import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { StepperComponent } from './stepper.component';

const routes: Routes = [
  {
    path: '',
    component: StepperComponent,
  },
  {
    path: 'edit/:id',
    component: CreateProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepperRoutingModule {}
