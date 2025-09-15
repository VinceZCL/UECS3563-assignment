import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ProfileEditComponent],
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

  onUserUpdate(updated : User) : void {
    this.user=updated;
    this.mode = false;
  }

}
