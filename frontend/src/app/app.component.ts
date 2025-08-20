import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';

import { User } from './models/user';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  users: User[] = [];

  private userService = inject(UserService);

  ngOnInit() : void {
    this.loadUsers();
  }

  loadUsers() : void {
    this.userService.getUsers().subscribe({
      next: (event: User[]) => {
        console.log(event);
        this.users = event;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }
}
