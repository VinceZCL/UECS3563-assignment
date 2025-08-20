import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:8080/api";
  private http = inject(HttpClient);

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
