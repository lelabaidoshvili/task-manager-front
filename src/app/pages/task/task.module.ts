import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {SharedModule} from "../../shared/shared.module";
import { AddTaskComponent } from './add-task/add-task.component';
import { ProjectBoardComponent } from './project-board/project-board.component';




@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent,
    ProjectBoardComponent,


  ],
  imports: [
    SharedModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
