import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  get loggedIn() {
    return this.authService.token
  }

  constructor(private router: Router, private authService:  AuthService) {
    // this.isLoggedIn$.next(!!localStorage.getItem)
  }

  ngOnInit(): void {

  }


  public signOut(): void {
    this.authService.signOut();
    // this.isLoggedIn$.next(false);
    this.router.navigate(["/"])


  }





}
