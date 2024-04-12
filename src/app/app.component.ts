import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RHManager';
}
