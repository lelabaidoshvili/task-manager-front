import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {AuthService} from "../../core/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {

  public loggedIn = false;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private authService:  AuthService, private cdr: ChangeDetectorRef) {
    this.isLoggedIn$.next(!!localStorage.getItem)
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((loggedInStatus) => {
      this.loggedIn = loggedInStatus;
      this.cdr.detectChanges();
    });
  }


  public signOut(): void {
    this.authService.signOut();
    this.isLoggedIn$.next(false)

  }


}
