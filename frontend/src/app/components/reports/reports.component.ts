import { Component, inject, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DailyReport, EnrichedReport } from '../../models/report';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { filter, forkJoin, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  private reportService = inject(ReportService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private childRouteActive : boolean = false;

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

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.childRouteActive = this.route.firstChild != null;
      });
  }

  isDetailView() : boolean {
    return this.childRouteActive;
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
