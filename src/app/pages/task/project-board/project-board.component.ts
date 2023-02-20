import { Component, OnInit } from '@angular/core';

import { BoardResponse } from '../../../core/interfaces';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { ActivatedRoute } from '@angular/router';

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
}
