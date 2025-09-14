import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  user! : User;
  mode : boolean = false;
  form: FormGroup;
  error!: string;

  constructor() {
    this.form = this.fb.group({
      old_name: ["", Validators.required],
      old_password: ["", Validators.required],
      new_name: ["", Validators.required],
      new_password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.auth.getUserFromAuth().subscribe({
      next: (val: User) => {
        console.log(val);
        this.user = val;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    })
  }

  toggleEdit() : void {
    this.mode = !this.mode;
    if (this.mode) {
      this.form.patchValue({old_name: this.user.username});
    }
  }

  submitEdit() : void {
    if (this.form.invalid) {
      this.error = "Missing fields";
      return;
    } else {
      this.error = "";
      let userId = this.user.id;
      this.userService.editUser({id: userId, ...this.form.value}).subscribe({
        next: (val: any) => {
          console.log(val);
          this.user.id = val.id;
          this.user.username = val.username;
          this.form.reset();
          this.mode = !this.mode;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.error = err.error.message;
          return;
        }
      })
    }
  }

}
