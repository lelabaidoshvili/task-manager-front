import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Board} from "../interfaces/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService{

  createBoard(payload: Board):Observable<Board> {
    return this.post<Board>('board', payload);
  }
}
