import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Board, BoardResponse } from '../core/interfaces';
import { BoardHttpService } from '../core/services/board-http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardFacadeService {
  myBoards: BehaviorSubject<BoardResponse[]> = new BehaviorSubject<
    BoardResponse[]
  >([]);
  boards$ = this.myBoards.asObservable();

  constructor(private boardHttpService: BoardHttpService) {}

  createBoard(payload: Board) {
    return this.boardHttpService.createBoard(payload);
  }
  //needs to be removed
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

  getMyBoards$(): Observable<BoardResponse[]> {
    return this.boardHttpService
      .getBoards()
      .pipe(tap((boards) => this.myBoards.next(boards)));
  }
}
