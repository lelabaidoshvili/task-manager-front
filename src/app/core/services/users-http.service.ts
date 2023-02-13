import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {
  UserPasswordUpdate,
  Users,
  UsersDataResponse,
  UsersDeleteResponse,
  UsersResponse,
  UsersRole,
} from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService extends BaseService {
  createUsers(payload: Users): Observable<UsersResponse> {
    return this.post<UsersResponse>('users', payload);
  }
  getAllUsers(): Observable<UsersResponse[]> {
    return this.get<UsersResponse[]>('users/all');
  }

  getUsers(): Observable<UsersDataResponse> {
    return this.get<UsersDataResponse>('users');
  }

  createUsersRoles(payload: UsersRole): Observable<UsersResponse> {
    return this.post<UsersResponse>('users/roles', payload);
  }

  getUserById(id: number): Observable<UsersResponse> {
    return this.get<UsersResponse>(`users/${id}`);
  }

  updateUserById(id: number, payload: Users): Observable<UsersResponse> {
    return this.put<UsersResponse>(`users/${id}`, payload);
  }

  deleteUserById(id: number): Observable<UsersDeleteResponse> {
    return this.delete<UsersDeleteResponse>(`users/${id}`);
  }

  // updateUsersPassword(payload: UserPasswordUpdate): Observable<UsersResponse> {
  //   return this.post<UsersResponse>('users/passwordUpdate');
  // }
  //---------
}
