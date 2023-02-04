import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit {
  public loggedIn = false;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient, private authService:  AuthService, private cdr: ChangeDetectorRef) {
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
    this.isLoggedIn$.next(false);
    this.router.navigate(["/"])


  }


}
