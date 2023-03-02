import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "../../shared/shared.module";
import {PermissionsDirective} from "../../core/directives/permissions.directive";




@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    PermissionsDirective

  ]
})
export class MainLayoutModule { }
