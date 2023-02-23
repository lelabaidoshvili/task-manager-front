import { Component, OnInit} from '@angular/core';
import { BoardResponse } from '../../../core/interfaces';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  myBoard: BoardResponse[] = [];
  boards: BoardResponse;
  column:any;

  tasks: any = {
 378:  [
      {
        id:1,
        title: 'todo1',

      },
{
  id:2,
  title: 'todo2'

},
{
  id:3,
    title: 'todo3'

}

],
    379: [],
    380: [],
    381: [],

  }


constructor(
    private boardFacadeService: BoardFacadeService,
    private route: ActivatedRoute,
    public dialog: MatDialog

  ) {}


  ngOnInit(): void {
    this.getBoardById();
    this.getBoards();
  }

  getBoardById() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.boardFacadeService.getBoardById(id).subscribe(
        (board) => {
          console.log(id);
          this.boards = board;
          console.log(board);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  getBoards() {
    this.boardFacadeService.getBoards().subscribe(
      (boards) => {
        console.log(boards);
        this.myBoard = boards;
        this.column = this.boards.columns
      },
      (error) => {
        console.error(error);
      }
    );
  }
  drop(event: CdkDragDrop<any>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  drop1(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.boards.columns, event.previousIndex, event.currentIndex);
  }
  openAddTaskDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

