import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
}
