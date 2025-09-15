import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  @Input() user! : User;
  @Output() update : EventEmitter<User> = new EventEmitter<User>();
  @Output() cancel : EventEmitter<void> = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private uss = inject(UserService);

  form: FormGroup;
  error: string = "";

  constructor() {
    this.form = this.fb.group({
      old_name: ["", Validators.required],
      old_password: ["", Validators.required],
      new_name: ["", Validators.required],
      new_password: ["", Validators.required],
    })
  }

  ngOnInit() : void {
    if (this.user) {
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
      this.uss.editUser({id: userId, ...this.form.value}).subscribe({
        next: (val: User) => {
          console.log(val);
          this.form.reset();
          this.update.emit(val);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.error = err.error.message;
          return;
        }
      })
    }
  }

  onCancel() : void {
    this.cancel.emit();
  }
  
}
