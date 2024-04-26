import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {ProfileComponent} from "./Component/dashboard/profile/profile.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjetComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RHManager';
}
