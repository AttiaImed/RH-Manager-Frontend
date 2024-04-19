import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EntryService } from '../../Services/entry.service';
import { TokenStorageService } from '../../Services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { Utilisateur } from '../../Models/utilisateur';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  LogoImgPath = '../../../assets/logo.png';

  // Dark Mode or Light Mode
  darkMode: boolean = false;

  // User data object
  userData: Utilisateur = {
    email: "", id: 0, idUtilisateur: 0, login: "", nom: "", password: "", prenom: "", status: false, type: ""
  };

  // Status variable
  status = false;

  // Image profile variable
  imageProfile!: SafeUrl;

  constructor(
    private tokenStorageService: TokenStorageService,
    private EService: EntryService,
  ) {
    // Setting user role from token storage
    this.userData.type = this.tokenStorageService.getRole() as string;
  }

  ngOnInit(): void {
    // Method to initialize component
    this.refreshProfile();
  }

  // Method to refresh profile
  refreshProfile() {
    //const userAuth = this.tokenStorageService.getUser();
    this.getImage();
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
  getImage() {
    this.imageProfile =
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
  }

  // Method to change mode (Dark Mode or Light Mode)
  modeChanges() {
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);
  }
}
