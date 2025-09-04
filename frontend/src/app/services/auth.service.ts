import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080/api/auth";
  private http = inject(HttpClient);

  private logged = new BehaviorSubject<boolean>(this.hasToken())
  isLogged = this.logged.asObservable();

  login(cred: {name:string, password:string}) :Observable<String> {
    return this.http.post(this.url, cred, {responseType:"text"})
      .pipe(tap(token => {
        localStorage.setItem("token", token);
        this.logged.next(true);
      }))
  }

  hasToken() : boolean {
    return !!localStorage.getItem("token");
  }

  getToken() : string | null {
    return localStorage.getItem("token");
  }

  logout() : void {
    localStorage.removeItem("token");
  }

  getUserFromAuth() : Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/users/jwt`);
  }

  private user! : User;

  getUserId() : Observable<number> {
    return this.getUserFromAuth().pipe(
      map((user:User) => user.id)
    );
  }
}
