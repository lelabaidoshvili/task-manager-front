import { Injectable } from '@angular/core';
import { Users, UsersRole } from '../core/interfaces/users.interface';
import { UsersHttpService } from '../core/services/users-http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersFacadeService {
  constructor(private usersHttpService: UsersHttpService) {}

  createUsers(payload: Users) {
    return this.usersHttpService.createUsers(payload);
  }
  getAllUsers() {
    return this.usersHttpService.getAllUsers();
  }

  getUsers() {
    return this.usersHttpService.getUsers();
  }

  createUsersRoles(payload: UsersRole) {
    return this.usersHttpService.createUsersRoles(payload);
  }
  getUserById(id: number) {
    return this.usersHttpService.getUserById(id);
  }

  updateUserById(id: number, payload: Users) {
    return this.usersHttpService.updateUserById(id, payload);
  }

  deleteUserById(id: number) {
    return this.usersHttpService.deleteUserById(id);
  }
}
