import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {SharedModule} from "../../shared/shared.module";
import { AddTaskComponent } from './add-task/add-task.component';



@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent,

  ],
  imports: [
    SharedModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
