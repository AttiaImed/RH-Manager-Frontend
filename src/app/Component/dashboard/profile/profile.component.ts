import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Utilisateur} from "../../../Models/utilisateur";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {TokenStorageService} from "../../../Services/token.service";
import {UserService} from "../../../Services/user.service";
const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ErrorsStateMatcher} from "../../../Models/ErrorStateMatcher";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: Utilisateur = {
    email: "", id: 0, idUtilisateur: 0, login: "", nom: "", password: "", prenom: "", status: false, type: "",poste:""

  };


  constructor(
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private tokenStorage: TokenStorageService,
    private userService : UserService,
    private MatSnackBar : MatSnackBar

  ) {
    this.user.id =  Number(this.tokenStorage.getUser());
    this.refreshProfile();

  }
  refreshProfile() {
    this.getImage(this.user.id);
    this.userService.get(this.user.id).subscribe(
      (res: Utilisateur) => {
        this.user.nom = res.nom;
        this.user.prenom = res.prenom;
        this.user.email = res.email;
        this.user.status = res.status;
        console.log(this.user)
        // Initialize form controls with user data
        this.form.patchValue({
          email: this.user.email,
          firstName: this.user.nom,
          lastName: this.user.prenom
        });
      },
      () => {
        this.MatSnackBar.open('Error while loading user Infos', 'Close', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }




  // Form validators
  form: FormGroup = new FormGroup({
    email: new FormControl(this.user.email , [Validators.required, Validators.email]),
    lastName: new FormControl(this.user.prenom, [Validators.required]),
    firstName: new FormControl(this.user.nom, [Validators.required]),
  });
  matcher = new ErrorsStateMatcher();

  // Get all Form Fields
  get email() {
    return this.form.get('email');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get firstName() {
    return this.form.get('firstName');
  }

  // Method invoked on form submission
  onSubmit() {
    this.user.nom = this.firstName?.value;
    this.user.email = this.email?.value;
    this.user.prenom = this.lastName?.value;
    console.log(this.user);
    if (this.form.valid) {
      this.userService.Update(this.user.id,this.user).subscribe(
        (res: any) => {
          this._snackBar.open('Change Success', '✅');
          window.location.reload();
          console.log(res);

        },
        (error) => {
          console.log(error);
          this._snackBar.open('Server Error :' +error.message, '❌');
        }
      );
    } else {
      this._snackBar.open('Enter valid information !!!', '❌');
    }
  }

  // Method to handle image upload
  imageProfile!: SafeUrl;
  uploadedImage!: any;
  // Method to get profile picture
  getImage(userId: number) {
    this.userService.getFile(userId).subscribe(
      (res: any) => {
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      () => {
        this.imageProfile = LogoImgPath;
      }
    );
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    this.imageUploadAction();
  }

  // Method to change profile picture
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage);
    this.userService.uploadImage(this.user.id as number, imageFormData).subscribe(
      (response: any) => {
        console.log(response.status);
        this.getImage(this.user.id as number);
        window.location.reload();
      },
      (error) => {
        this.MatSnackBar.open('Error while uploading your Image', 'Close', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );

  }
}
