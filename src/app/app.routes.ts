import { Routes } from '@angular/router';
import {ProjetComponent} from "./Component/Projet/projet/projet.component";
import {DossierComponent} from "./Component/Projet/dossier/dossier.component";
import {LoginComponent} from "./Component/login/login.component";
import {SignupComponent} from "./Component/signup/signup.component";
import {DashboardComponent} from "./Component/dashboard/dashboard.component";
import {AuthGuard} from "./Guards/auth.guard";
import {SecureInnerPagesGuard} from "./Guards/secure-inner-pages.guard";
import {ProjectComponent} from "./Component/dashboard/project/project.component";
import {ReclamationComponent} from "./Component/dashboard/reclamation/reclamation.component";
import { CongeComponent } from './Component/Projet/conge/conge.component';
import {TasksComponent} from "./Component/dashboard/project/Project/tasks/tasks.component";
import {DetailTaskComponent} from "./Component/dashboard/project/Project/tasks/detail-task/detail-task.component";
import {ProjectDetailsComponent} from "./Component/dashboard/project/project-details/project-details.component";
import { EquipeComponent } from './Component/dashboard/equipe/equipe.component';
import {TeamDetailsComponent} from "./Component/dashboard/equipe/team-details/team-details.component";
import {ProfileComponent} from "./Component/dashboard/profile/profile.component";
import {StatisticsComponent} from "./Component/dashboard/statistics/statistics.component";


export const routes: Routes = [
  {path: 'login', component :LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'signup', component :SignupComponent, canActivate: [SecureInnerPagesGuard]},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],// this is the component with the <router-outlet> in the template
    children: [
      {
        path: "Profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data:{
          role: ['RH','DIRECTOR','MANAGER','ADMINISTRATEUR','EMPLOYE']
        }
      },
      {
        path: "Project",
        component: ProjectComponent,
        canActivate: [AuthGuard],
        data:{
          role: ['RH','DIRECTOR','MANAGER','ADMINISTRATEUR']
        }
      },
      {
        path: "Statistics",
        component: StatisticsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Project/:id',
        component: ProjectDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Reclamation',
        component :ReclamationComponent,
        canActivate: [AuthGuard],
        data:{
          role :['ADMINISTRATEUR','RH','EMPLOYE']
        }
      },
      {
        path: 'equipe',
        component :EquipeComponent,
        canActivate: [AuthGuard],
        data:{
          role :['ADMINISTRATEUR','RH','DIRECTOR']
        }
      },
      {
        path: 'equipe/Details/:id',
        component: TeamDetailsComponent,
        canActivate: [AuthGuard],
        data:{
          role :['ADMINISTRATEUR','RH','DIRECTOR']
        }
      },
      {
        path: 'Conges',
        component :CongeComponent,
        canActivate: [AuthGuard],
      },
      {path : "" , redirectTo: '/Statistics', pathMatch: 'full'}
    ]
  },
  { path: '',   redirectTo: '/Dashboard/Statistics', pathMatch: 'full' }, // redirect to

  { path: '**',  redirectTo: '/Dashboard/Statistics'},
  {path: 'login', component :LoginComponent},
  {path: 'signup', component :SignupComponent},
];
