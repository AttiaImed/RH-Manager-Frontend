import { Routes } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {DossierComponent} from "./Component/Projet/dossier/dossier.component";
import {LoginComponent} from "./Component/Projet/login/login.component";
import {SignupComponent} from "./Component/Projet/signup/signup.component";

export const routes: Routes = [
  {path: 'projet', component :ProjetComponent},
  {path: 'dossier', component :DossierComponent},
  {path: 'login', component :LoginComponent},
  {path: 'signup', component :SignupComponent},

];
