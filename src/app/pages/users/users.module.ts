import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {SharedModule} from "../../shared/shared.module";
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersRoleComponent } from './users-role/users-role.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersEditComponent,
    UsersRoleComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
