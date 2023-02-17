import { Injectable } from '@angular/core';
import {Task, Tasks} from "../interfaces/task";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {Users, UsersDataResponse, UsersDeleteResponse, UsersResponse} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class TaskHttpService extends BaseService {

  createTask(payload: Task): Observable<Tasks> {
    return this.post<Tasks>('task', payload);
  }

  getTask(): Observable<Tasks[]> {
    return this.get<Tasks[]>('task');
  }

  getTaskById(id: number): Observable<Tasks[]> {
    return this.get<Tasks[]>(`task/${id}`);

  }
  updateTaskById(id: number, payload: Task): Observable<Tasks[]> {
    return this.put<Tasks[]>(`task/${id}`, payload);
  }
  deleteTaskById(id: number): Observable<Tasks[]> {
    return this.delete<Tasks[]>(`task/${id}`);
  }
}
