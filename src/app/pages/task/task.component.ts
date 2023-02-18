import { Component, OnInit } from '@angular/core';
import { ProjectFacadeService } from '../../facades/project.facade.service';
import { BoardFacadeService } from '../../facades/board-facade.service';
import { BehaviorSubject, map } from 'rxjs';
import { Project } from 'src/app/core/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { IssueTypeFacadeService } from '../../facades/issue-type.facade.service';
import { IssueTypeResponse } from '../../core/interfaces/issuetype.interface';
import { UsersFacadeService } from '../../facades/users-facade.service';
import { BoardResponse, UsersDataResponse } from 'src/app/core/interfaces';
import { StepperService } from '../stepper/stepper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  ngOnInit(): void {}
}

//  //------
//  this.projectFacadeService.current$.subscribe((res) => {
//   this.currentProject = res;

//   console.log(res);

//   console.log(this.currentProject);
// });
// //-----------
// openBoardForm() {
//   this.router.navigate(['/stepper']);
//   this.stepperService.goToStep(1);
// }
