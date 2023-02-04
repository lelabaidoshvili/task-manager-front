import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./feature/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: "stepper",
        loadChildren: () => import("./pages/stepper/stepper.module").then(m => m.StepperModule)
      }
     ]
   }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
