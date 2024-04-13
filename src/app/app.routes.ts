import { Routes } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {DossierComponent} from "./Component/Projet/dossier/dossier.component";
import {ReclamationComponent} from "./Component/Reclamation/reclamation/reclamation.component";

export const routes: Routes = [
  {path: 'projet', component :ProjetComponent},
  {path: 'dossier', component :DossierComponent},
  {path: 'reclamation', component :ReclamationComponent},


];
