import {Component} from '@angular/core';
import {LoginService} from "../../Services/Projet/login.service";
import {Utilisateur} from "../../Models/utilisateur";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {EntryService} from "../../Services/entry.service";
import {TokenStorageService} from "../../Services/token.service";
import {ErrorsStateMatcher} from "../../Models/ErrorStateMatcher";
import {MatInput} from "@angular/material/input";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatIcon,
    MatFormField,
    MatLabel,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private entryService: EntryService,
    private tokenStorage: TokenStorageService,
  ) {
  }

  // Error state matcher for form validation
  matcher = new ErrorsStateMatcher();

  // Variable for tracking active form and hide/show password
  active: string = '';
  hide: boolean = true;
  errorMessage: string = '';
  userData: Utilisateur = {
    email: "", id: 0, idUtilisateur: 0, login: "", nom: "", password: "", prenom: "", status: false, type: ""
  };
mail = "exemple@mail.com"
  typeOptions: string[] = ['RH', 'EMPLOYE', 'ADMINISTRATEUR', 'MANAGER', 'DIRECTOR'];

  // Form group with email and password form controls
  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    ]),

  });
  onSubmit() {
    if (this.form.valid) {
      // Populate userData with form values
      this.userData.email = this.form.get('email')?.value;
      this.userData.nom = this.form.get('nom')?.value;
      this.userData.prenom = this.form.get('prenom')?.value;
      this.userData.password = this.form.get('password')?.value;

      // Call register method with populated userData
      this.entryService.signUp(this.userData).subscribe({
        next: (data: any) => {
          this.router.navigate(['/login']);
          this._snackBar.open("Sign up successfully, Redirecting to log in page", '❌');

        },
        error: (err: Error) => {
          console.log(err);
          this._snackBar.open("Verify your data", '❌');
        }
      });
    } else {
      this._snackBar.open("Error creating account", '❌');
    }
  }

}
