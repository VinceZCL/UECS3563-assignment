import { Component, inject, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DailyReport, EnrichedReport } from '../../models/report';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { firstValueFrom, forkJoin, map, Observable, switchMap } from 'rxjs';
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
  reports: DailyReport[] = [];
  enReports: EnrichedReport[] = [];

  reportFilter: string = "my";

  filterChange() {
    if (this.enReports.length >= 1) {
      this.enReports.length = 0;
    }
    if (this.reports.length >= 1) {
      this.reports.length = 0;
    }
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

  getAllReports(): void {
    this.reportService.getReports().pipe(
      switchMap((reports: DailyReport[]) => {
        this.reports = reports;

        const enrichedReports$ = reports.map(report =>
          this.userService.getUsername(report.userId).pipe(
            map(username => ({
              ...report,
              username,
            }))
          )
        );
        return forkJoin(enrichedReports$);
      })
    ).subscribe({
      next: (enriched: EnrichedReport[]) => {
        this.enReports = enriched;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  getOwnReports(): void {
    this.reportService.getCurUserReports().pipe(
      switchMap((reports: DailyReport[]) => {
        this.reports = reports;

        const enrichedReports$ = reports.map(report =>
          this.userService.getUsername(report.userId).pipe(
            map(username => ({
              ...report,
              username,
            }))
          )
        );
        return forkJoin(enrichedReports$);
      })
    ).subscribe({
      next: (enriched: EnrichedReport[]) => {
        this.enReports = enriched;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

}
