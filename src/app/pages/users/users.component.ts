import { Component, OnInit } from '@angular/core';
import {Users, UsersResponse} from "../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {UsersFacadeService} from "../../facades/users-facade.service";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {AddUsersComponent} from "../stepper/add-users/add-users.component";
import {takeUntil, of, switchMap} from "rxjs";
import {ConfirmComponent} from "../../shared/confirm/confirm.component";
import {Router} from "@angular/router";
import {UsersEditComponent} from "./users-edit/users-edit.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Users>();
  sub$ = new Subject();
  pageIndex = 1;
  total = 0;
  pageSize = 10;
  user: UsersResponse[] =[]

  constructor(
    private userService: UsersFacadeService,
    public dialog: MatDialog,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.getAllUsers()
    // this.getUsers()

  }
  // getUsers() {
  //   this.userService.getUsers({
  //     page: this.pageIndex,
  //     limit: this.pageSize
  //   })
  //     .subscribe(users => {
  //       this.dataSource.data = users.data;
  //       this.total = users.totalCount;
  //     });
  // }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe( users => {
        this.dataSource.data = users
      })
  }
  addUser(id?: number) {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    })

  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.userService.deleteUserById(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getAllUsers();
        }
      });
  }
  updateUser(id: number) {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    })
  }
  // pageEvent($event: PageEvent) {
  //   console.log($event)
  //   this.pageIndex = $event.pageIndex + 1;
  //   this.pageSize = $event.pageSize;
  //   this.getUsers()
  // }

}
