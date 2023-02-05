import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authFacadeService: AuthFacadeService = inject(AuthFacadeService);
  get loggedIn() {
    return this.authFacadeService.token;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public signOut(): void {
    this.authFacadeService.signOut();

    this.router.navigate(['/']);
  }
}
