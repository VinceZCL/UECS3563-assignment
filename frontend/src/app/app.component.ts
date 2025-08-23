import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';

import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  log : boolean = false;

  private auth = inject(AuthService);

  ngOnInit() : void {
    this.auth.isLogged.subscribe(status => this.log = status);
  }

  logout(): void {
    this.auth.logout();
  }
}
