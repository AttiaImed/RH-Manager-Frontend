import { Routes } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {DossierComponent} from "./Component/Projet/dossier/dossier.component";
import {LoginComponent} from "./Component/login/login.component";
import {SignupComponent} from "./Component/signup/signup.component";
import {DashboardComponent} from "./Component/dashboard/dashboard.component";
import {AuthGuard} from "./Guards/auth.guard";
import {SecureInnerPagesGuard} from "./Guards/secure-inner-pages.guard";
import {ProjectComponent} from "./Component/dashboard/project/project.component";

export const routes: Routes = [
  {path: 'projet', component :ProjetComponent},
  {path: 'dossier', component :DossierComponent},
  {path: 'login', component :LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'signup', component :SignupComponent, canActivate: [SecureInnerPagesGuard]},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],// this is the component with the <router-outlet> in the template
    children: [
      {
        path: "Project",
        component: ProjectComponent,
        canActivate: [AuthGuard],
      },

    ]
  },
  { path: '',   redirectTo: '/Dashboard/Project', pathMatch: 'full' }, // redirect to

  { path: '**',  redirectTo: '/Dashboard/Project'},

];

