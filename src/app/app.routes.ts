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
import {FeedbackComponent} from "./Component/dashboard/feedback/feedback.component";
import {StatisticsComponent} from "./Component/dashboard/statistics/statistics.component";


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
        path: "Profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Project",
        component: ProjectComponent,
        canActivate: [AuthGuard],


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

      {path: 'Reclamation', component :ReclamationComponent,canActivate: [AuthGuard]},
      {path: 'FeedBack', component :FeedbackComponent,canActivate: [AuthGuard]},
      {path: 'equipe', component :EquipeComponent},
      {
        path: 'equipe/Details/:id',
        component: TeamDetailsComponent,
        canActivate: [AuthGuard],
      },

      {path: 'Conges', component :CongeComponent,canActivate: [AuthGuard]}
    ]
  },
  { path: '',   redirectTo: '/Dashboard/Project', pathMatch: 'full' }, // redirect to

  { path: '**',  redirectTo: '/Dashboard/Project'},
  {path: 'login', component :LoginComponent},
  {path: 'signup', component :SignupComponent},



];
