import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard} from "@angular/material/card";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {EntryService} from "../../Services/entry.service";
import {TokenStorageService} from "../../Services/token.service";
import {ErrorsStateMatcher} from "../../Models/ErrorStateMatcher";
import {CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatIcon,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private entryService: EntryService,
    private tokenStorage: TokenStorageService
  ) {
  }

  // Error state matcher for form validation
  matcher = new ErrorsStateMatcher();

  // Variable for tracking active form and hide/show password
  active: string = '';
  hide: boolean = true;
  errorMessage: string = '';

  // Form group with email and password form controls
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Getter methods for form controls
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  // Function invoked on form submission
  onSubmit() {
    const LoginInfo = {
      email: this.email?.value,
      password: this.password?.value,
    };
    console.log(LoginInfo);
    if (this.form.valid) {
      this.entryService.signIn(LoginInfo)
        .subscribe({
          next: (data: any) => {
            this.tokenStorage.saveToken(data.token);
            this.router.navigate(['/down']);
          },
          error: (err: Error) => {
            this.errorMessage = err.message;
            console.log(err);
            this._snackBar.open(this.errorMessage, '❌');
          }
        });

      this.router.navigate(['/down']);
    } else {
      this._snackBar.open('Enter valid information!!!', '❌');
    }
  }
}
