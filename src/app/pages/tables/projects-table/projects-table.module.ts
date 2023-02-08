import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsTableComponent } from './projects-table.component';
const routes: Routes = [
  {
    path: '',
    component: ProjectsTableComponent,
  },
];
@NgModule({
  declarations: [ProjectsTableComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsTableModule {}
