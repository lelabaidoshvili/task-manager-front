import { Component, OnInit } from '@angular/core';
import {BoardFacadeService} from "../../../facades/board-facade.service";
import {BoardResponse} from "../../../core/interfaces";

@Component({
  selector: 'app-board-select',
  templateUrl: './board-select.component.html',
  styleUrls: ['./board-select.component.scss']
})
export class BoardSelectComponent implements OnInit {
  myBoard: BoardResponse[] = [];

  constructor(
    private boardFacadeService: BoardFacadeService

  ) { }

  ngOnInit(): void {
    this.boardFacadeService.getBoards()
      .subscribe(boards => {
        console.log(boards);
        this.myBoard = boards;
      }, error => {
        console.error(error);
      });
  }






}
