import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { StepperComponent } from './stepper.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [StepperComponent, CreateProjectComponent, BoardComponent],
  imports: [CommonModule, StepperRoutingModule, SharedModule],
})
export class StepperModule {}
