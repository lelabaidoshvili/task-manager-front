import { Injectable } from '@angular/core';
import {UsersHttpService} from "../core/services/users-http.service";
import {AddUsers} from "../core/interfaces/addUsers.interface";


@Injectable({
  providedIn: 'root',
})

export class UsersFacadeService {

  constructor(private usersHttpService: UsersHttpService) {
  }

  createUsers(payload: AddUsers) {
    return this.usersHttpService.createUsers(payload)
  }

}
