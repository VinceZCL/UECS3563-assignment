import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  error : string | null = null;
  loginFail : boolean = false;

  constructor() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.loginFail = false;
    if (this.form.invalid) {
      this.error = "Missing fields";
      this.markAllFields();
      return;
    };
    
    this.error = "";
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(["/home"]),
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.error = JSON.parse(err.error).message;
        this.markAllFields();
        this.loginFail = true;
      }
    })
  }

  invalidInp(controlName: string) : boolean {
    let control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched) || this.loginFail);
  }

  private markAllFields() : void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    })
  }
}
