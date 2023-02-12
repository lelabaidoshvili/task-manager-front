import { Injectable } from '@angular/core';
import { Board } from '../core/interfaces';
import { BoardHttpService } from '../core/services/board-http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardFacadeService {
  constructor(private boardHttpService: BoardHttpService) {}

  createBoard(payload: Board) {
    return this.boardHttpService.createBoard(payload);
  }

  getBoards() {
    return this.boardHttpService.getBoards();
  }

  getBoardById(id: number) {
    return this.boardHttpService.getBoardById(id);
  }

  updateBoardById(id: number, payload: Board) {
    return this.boardHttpService.updateBoardById(id, payload);
  }

  deleteBoardById(id: number) {
    return this.boardHttpService.deleteBoardById(id);
  }
}
