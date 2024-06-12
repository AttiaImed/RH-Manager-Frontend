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
import {Subject, takeUntil} from "rxjs";
import {FaceRecognitionComponent} from "../face-recognition/face-recognition.component";
import {MatDialog} from "@angular/material/dialog";

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
    FaceRecognitionComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private entryService: EntryService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
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
    console.log(this.form)
    const LoginInfo = {
      email: this.email?.value,
      password: this.password?.value,
    };
    console.log(LoginInfo);
    if (this.form.valid) {
      this.entryService.signIn(LoginInfo)
        .pipe(
          takeUntil(this.destroy$)
    )
        .subscribe({
          next: (data: any) => {
            this.tokenStorage.saveToken(data.token);
            localStorage.setItem("user_id",this.tokenStorage.getId())
            this.router.navigate(['/Dashboard']);
          },
          error: (err: Error) => {
            this.errorMessage = err.message;
            console.log(err);
            this._snackBar.open(this.errorMessage, '❌');
          }
        });
    } else {
      this._snackBar.open('Enter valid information!!!', '❌');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FaceRecognitionComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logic to handle the result from the dialog, e.g., refresh the table
      console.log('Dialog result:', result);
      if (result) {
        window.location.reload();
      }
    });
  }
}
