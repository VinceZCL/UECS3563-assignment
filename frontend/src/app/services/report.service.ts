import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { DailyReport } from '../models/report';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = "http://localhost:8080/api";
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getReports() : Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(`${this.url}/reports`);
  }

  getUserReports(userId:number) : Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(`${this.url}/reports/user?id=${userId}`);
  }

  getCurUserReports() : Observable<DailyReport[]> {
    return this.authService.getUserId().pipe(
      switchMap(userId => this.getUserReports(userId))
    )
  }

  createReport(rep: {userId:number, yesterday:string, today:string, blockers:string}) : Observable<Report> {
    return this.http.post<Report>(`${this.url}/reports`, rep);
  }
}
