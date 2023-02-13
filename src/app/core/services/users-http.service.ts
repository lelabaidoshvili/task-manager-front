import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {User} from "../interfaces";
import {AddUsers} from "../interfaces/addUsers.interface";
import {UsersDeleteResponse} from "../interfaces/addUsers.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService extends BaseService {

  createUsers(payload: AddUsers): Observable<AddUsers> {
    return this.post<AddUsers>('users', payload);
  }
  getAllUsers(): Observable<User[]> {
    return this.get<User[]>('users/all');
  }
  createUsersRoles(payload: User): Observable<User> {
    return this.post<User>('users/roles', payload);
  }
  getUsersById(id: number): Observable<User> {
    return this.get<User>(`users/${id}`)
  }
  updateUsers(id: number, users: AddUsers): Observable<AddUsers> {
    return this.put<AddUsers>(`project/${id}`, users);
  }
  deleteUsers(id: number): Observable<UsersDeleteResponse> {
    return this.delete<UsersDeleteResponse>(`project/${id}`);
  }
}
