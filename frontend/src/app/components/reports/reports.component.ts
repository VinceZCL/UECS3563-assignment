import { Component, inject, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DailyReport, EnrichedReport } from '../../models/report';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  imports: [FormsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  private reportService = inject(ReportService);
  private userService = inject(UserService);
  reports! : EnrichedReport[] | undefined;

  reportFilter: string = "my";

  filterChange() {
    this.changeReports();
  }

  ngOnInit(): void {
    this.filterChange();
  }

  changeReports() {
    if (this.reportFilter === "all") {
      this.getAllReports();
    } else if (this.reportFilter === "my") {
      this.getOwnReports();
    }
  }

  getAllReports() : void {
    this.reportService.getReports().pipe(
      switchMap((reports: DailyReport[]) => {
        this.reports = reports.map(report => ({
          ...report,
          username: ""
        }));
        return forkJoin(
          reports.map(report => this.userService.getUsername(report.userId).pipe(
            map(name => ({...report, username: name}))
          ))
        );
      })
    ).subscribe({
      next: (enReports : EnrichedReport[]) => {
        this.reports = enReports;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  getOwnReports() : void {
    this.reportService.getCurUserReports().pipe(
      switchMap((reports: DailyReport[]) => {
        this.reports = reports.map(report => ({
          ...report,
          username: ""
        }));
        return forkJoin(
          reports.map(report => this.userService.getUsername(report.userId).pipe(
            map(name => ({...report, username: name}))
          ))
        );
      })
    ).subscribe({
      next: (enReports : EnrichedReport[]) => {
        this.reports = enReports;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  getReportUsername(id:number) : Observable<string> {
    return this.userService.getUsername(id);
  }

  // component for individual / single report
  // accessed via href = ?id= with report.id
  // if authService get userId match -> allow delete

}
