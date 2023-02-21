import { Component, OnInit } from '@angular/core';
import { BoardResponse } from '../../../core/interfaces';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {transferArrayItem} from "@angular/cdk/drag-drop";
import {Column} from "../../../core/interfaces/column";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  myBoard: BoardResponse[] = [];
  boards: BoardResponse;

  constructor(
    private boardFacadeService: BoardFacadeService,
    private route: ActivatedRoute
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
      },
      (error) => {
        console.error(error);
      }
    );
  }
  drop(event: CdkDragDrop<Column[]>) {
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
}
