import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { StepperComponent } from './stepper.component';


@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    StepperRoutingModule
  ]
})
export class StepperModule { }
