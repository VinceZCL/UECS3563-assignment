import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyReport } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = "http://localhost:8080/api";
  private http = inject(HttpClient);

  getReports() : Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(`${this.url}/reports`);
  }

  constructor() { }
}
