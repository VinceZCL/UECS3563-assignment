import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:8080/api";
  private http = inject(HttpClient);

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  getUsername(id:number) : Observable<string> {
    return this.http.get<User>(`${this.url}/user/${id}`).pipe(
      map((user:User) => user.username)
    )
  }

  createUser(cred: {name:string, password:string}) : Observable<User> {
    return this.http.post<User>(`${this.url}/users`, cred);
  }

  editUser(cred: {id:number, old_name:string, old_password:string, new_name:string, new_password:string}) : Observable<User> {
    return this.http.put<User>(`${this.url}/users`, cred);
  }
}
