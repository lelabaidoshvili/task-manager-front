import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "../../shared/shared.module";




@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,

  ]
})
export class MainLayoutModule { }
