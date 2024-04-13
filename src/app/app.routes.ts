import { Routes } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {DossierComponent} from "./Component/Projet/dossier/dossier.component";
import {LoginComponent} from "./Component/Projet/login/login.component";
import {SignupComponent} from "./Component/Projet/signup/signup.component";
import {ReclamationComponent} from "./Component/Reclamation/reclamation/reclamation.component";
import { CongeComponent } from './Component/Projet/conge/conge.component';


export const routes: Routes = [
  {path: 'projet', component :ProjetComponent},
  {path: 'dossier', component :DossierComponent},
  {path: 'login', component :LoginComponent},
  {path: 'signup', component :SignupComponent},
  {path: 'reclamation', component :ReclamationComponent},
  {path: 'conges', component :CongeComponent}


];
