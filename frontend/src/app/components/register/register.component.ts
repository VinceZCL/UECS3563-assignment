import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  form: FormGroup;
  error: string | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    },
    {validators: this.passwordValidator}
  );
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get("password")?.value;
    let confirm_password = control.get("confirm_password")?.value;

    if (password !== confirm_password) {
      return {passwordMismatch: true};
    }
    return null;
  }

  onSubmit() {
    if (this.form.invalid) {
      if (this.form.errors?.['passwordMismatch']) {
        this.error = "Passwords do not match";
      } else {
        this.error = "Missing fields";
      }
      this.form.markAllAsTouched();
      return;
    };

    this.error = "";
    let name = this.form.get("name")?.value;
    let password = this.form.get("password")?.value;
    this.userService.createUser({name, password}).subscribe({
      next: (val: User) => {
        this.router.navigate(["/login"]);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        try {
          this.error = JSON.parse(err.error).message;
        } catch {
          this.error = "Registration failure";
        }
      }
    })
  }

}
