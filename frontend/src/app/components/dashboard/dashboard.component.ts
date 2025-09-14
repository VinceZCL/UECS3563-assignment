import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private fb = inject(FormBuilder);
  private rep = inject(ReportService);
  private auth = inject(AuthService);

  form: FormGroup;
  success: string = "";
  error: string = "";
  uid!: number;

  constructor() {
    this.form = this.fb.group({
      yesterday: ["", Validators.required],
      today: ["", Validators.required],
      blockers: [""],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = "Missing fields";
      return;
    }
    this.error = "";
    this.auth.getUserId().subscribe({
      next: (id: number) => {
        this.rep.createReport({ userId: id, ...this.form.value }).subscribe({
          next: (rep: Report) => {
            this.form.reset();
            this.success = "Daily Check-In Submitted!"
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this.error = err.error.message;
          }
        })
      }
    })
  }

}
