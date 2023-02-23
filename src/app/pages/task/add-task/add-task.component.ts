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
  // taskFormGroup: FormGroup;
  // taskPropertyGroup: FormGroup;

  // priority = TaskPriority;
  // priorityEnum = [];
  // tasks = TaskStatus;
  // taskEnum = [];

  // setCheckBox: boolean = false;
  constructor(private taskFacadeService: TasksFacadeService) {
    // this.priorityEnum = Object.keys(this.priority);
    // this.taskEnum = Object.keys(this.tasks);
  }

  ngOnInit(): void {
    // this.taskPropertyGroup = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   filedName: new FormControl(null, Validators.required),
    //   value: new FormControl(null, Validators.required),
    //   isRequired: new FormControl(false, Validators.required),
    // });
    // this.taskFormGroup = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   issueTypeId: new FormControl(null, Validators.required),
    //   taskProperty: new FormArray([]),
    //   // epicId: new FormControl(null, Validators.required),
    //   boardId: new FormControl(null, Validators.required),
    //   boardColumnId: new FormControl(null, Validators.required),
    //   isBacklog: new FormControl(false, Validators.required),
    //   priority: new FormControl(null, Validators.required),
    //   taskStatus: new FormControl(null, Validators.required),
    //   assigneeId: new FormControl(null, Validators.required),
    //   reporterId: new FormControl(null, Validators.required),
    // });
  }

  // submit() {
  //   this.taskFacadeService
  //     .createTask(this.taskFormGroup.value)
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
