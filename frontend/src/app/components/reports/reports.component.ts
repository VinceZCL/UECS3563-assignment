import { Component, inject, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DailyReport } from '../../models/report';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  private reportService = inject(ReportService);
  reports! : DailyReport[] | undefined;

  ngOnInit(): void {
    this.getReports();
  }

  getReports() : void {
    this.reportService.getReports().subscribe({
      next: (val:DailyReport[]) => {
        console.log(val);
        this.reports = val;
      },
      error: (err: Error) => {
        console.error(err);
      },
    }
    )
  }

}
