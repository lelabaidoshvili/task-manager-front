import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/core/enums/task-priority.enum';
import { TaskStatus } from 'src/app/core/enums/taskStatus.enum';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(private taskFacadeService: TasksFacadeService) {}

  ngOnInit(): void {}
}
