import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EntryService } from '../../Services/entry.service';
import { TokenStorageService } from '../../Services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { Utilisateur } from '../../Models/utilisateur';
import {UserService} from "../../Services/user.service";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive, MatIcon, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isChatVisible: boolean = true;


  LogoImgPath = '../../../assets/logo.png';
  isLoggedIn:boolean = false;

  // Dark Mode or Light Mode
  darkMode: boolean = false;

  // User data object
  userData: Utilisateur = {
    email: "", id: 0, idUtilisateur: 0, login: "", nom: "", password: "", prenom: "", status: false, type: "",poste:""

  };

  // Status variable
  status = false;

  // Image profile variable
  imageProfile!: SafeUrl;


  constructor(
    private tokenStorageService: TokenStorageService,
    private EService: EntryService,
    private sanitizer: DomSanitizer,
    private MatSnackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn =!!this.tokenStorageService.getToken();
    // Method to initialize component
    this.refreshProfile();
  }

  // Method to refresh profile
  refreshProfile() {
    const userAuth = this.tokenStorageService.getUser();
    this.getImage(userAuth as number);
    this.userService.get(userAuth).subscribe((res: Utilisateur) => {
      this.userData = res;
    },(error)=>{
      this.MatSnackBar.open(error.error.message,'❌',{
        duration: 3000
      })
    });
  }

  // Method to logout
  signOut() {
    this.EService.signOut();
  }

  // Method to toggle status
  addToggle() {
    this.status = !this.status;
  }

  // Method to get user image
  getImage(userId : number) {
    this.userService.getFile(userId).subscribe(
      (res: any) => {
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      () => {
        this.imageProfile =
          'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
      }
    );
  }

  // Method to change mode (Dark Mode or Light Mode)
  modeChanges() {
    this.darkMode = !this.darkMode;
  }
}
