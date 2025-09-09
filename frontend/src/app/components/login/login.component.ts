import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  error : string | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = "Missing fields";
      return;
    };
    
    this.error = "";
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(["/home"]),
      error: () => this.error = "Login failed"
    })
  }
}
