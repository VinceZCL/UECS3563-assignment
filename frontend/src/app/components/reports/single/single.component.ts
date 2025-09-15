import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { DailyReport } from '../../../models/report';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single',
  imports: [CommonModule],
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent implements OnInit {
  reportId! : string;
  report! : DailyReport;
  username! : string;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rep = inject(ReportService);
  private uss = inject(UserService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reportId = params["id"];
      if (this.reportId) {
        this.rep.getReportById(parseInt(this.reportId)).subscribe(singlerep => {
          this.report = singlerep;
          this.uss.getUsername(this.report.userId).subscribe(name => {
            this.username = name;
          })
        })
      }
    })
  }

  back() {
    this.router.navigate(["/reports"]);
  }
}
