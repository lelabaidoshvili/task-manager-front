import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Board} from "../interfaces/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService{

  createBoard(payload: any):Observable<any> {
    return this.post<any>('board', payload);
  }
}
