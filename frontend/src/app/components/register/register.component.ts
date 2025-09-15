import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  form: FormGroup;
  error: string | null = null;
  regFail: boolean = false;

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
    this.regFail = false;
    if (this.form.invalid) {
      this.markAllFields();
      if (this.form.errors?.['passwordMismatch']) {
        this.error = "Passwords do not match";
        this.regFail = true;
      } else {
        this.error = "Missing fields";
      }
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
        this.markAllFields();
        this.regFail = true;
      }
    })
  }

  invalidInp(controlName : string) : boolean {
    let control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched) || this.regFail);
  }

  private markAllFields() : void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    })
  }

}
