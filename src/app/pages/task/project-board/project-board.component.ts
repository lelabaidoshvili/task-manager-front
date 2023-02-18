import { Component, OnInit } from '@angular/core';
import {BoardResponse} from "../../../core/interfaces";
import {BoardFacadeService} from "../../../facades/board-facade.service";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  myBoard: BoardResponse[] = [];

  constructor(
    private boardFacadeService: BoardFacadeService,
  ) { }

  ngOnInit(): void {
    this.boardFacadeService.getBoards().subscribe((Board) => {
      console.log(Board);
      this.myBoard = Board;
    });
  }

}
