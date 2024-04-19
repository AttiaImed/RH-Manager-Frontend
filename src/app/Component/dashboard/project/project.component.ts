import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../../Services/token.service";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {ProjectService} from "../../../Services/project.service";
import {TeamService} from "../../../Services/team.service";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    FormsModule,
    JsonPipe,
    NgForOf
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectData: any[] = [];
  filtredProjects: any[] = [];
  newProject = {
    projectName: '',
    projectDesc: '',
    status: 'open',
    endDate: '',
    idteam: '',
  };
  type: any;
  teams: any[] = [];


  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private matSnackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private router : Router
  ) {
    //this.getProjectsByRole();
    this.getAllProjects();
  }

  // Get project based on the role granted
  // getProjectsByRole() {
  //   if (HigherGrantedRoles.indexOf(this.tokenStorage.getRole()) != -1) {
  //     this.getAllProjects();
  //   } else if (ManagerRole.indexOf(this.tokenStorage.getRole()) != -1) {
  //     this.getProjectsBySuperViser();
  //   } else {
  //     this.getProjectByUser();
  //   }
  // }
  //Get All projects
  getAllProjects() {
    this.projectService.getAll().subscribe(
      (response: any[]) => {
        this.projectData = response;
        this.filtredProjects = this.projectData;
        console.log( this.filtredProjects);

        this.type = 'all';
      },
      () => {
        this.matSnackBar.open('Error while loading projects', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Get projects based on the working team on it
  getProjectByUser() {
    this.projectService
      .getProejctByUserId(this.tokenStorage.getUser() as string)
      .subscribe(
        (res: any) => {
          if (this.projectData.length > 0) {
            this.projectData = this.removeDuplicates(
              this.projectData.concat(res)
            );
            this.filtredProjects = this.removeDuplicates(
              this.filtredProjects.concat(res)
            );
          } else {
            this.projectData = res;
            this.filtredProjects = this.projectData;
          }
          this.type = 'all';
        },
        () => {
          this.matSnackBar.open('Error while loading projects', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }
  // gGet porjects that the current authenticated user is in charge on them
  getProjectsBySuperViser() {
    this.projectService
      .getProejctBySuperviserId(this.tokenStorage.getUser() as string)
      .subscribe(
        (res: any) => {
          this.projectData = res;
          this.filtredProjects = this.projectData;
          this.type = 'all';
          this.getProjectByUser();
        },
        () => {
          this.matSnackBar.open('Error while loading projects', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }
  // Filter projects based on the status chossen by user
  filterProjects(type: string) {
    if (type == 'all') {
      this.type = type;
      this.filtredProjects = this.projectData;
    } else {
      this.type = type;
      this.filtredProjects = this.projectData;
      this.filtredProjects = this.filtredProjects.filter(
        (project: any) => project.status === type
      );
    }
  }
  // Get all teams to choose from them when creating a new project
  openModel() {
    this.teamService.getAll().subscribe(
      (res: any) => {
        this.teams = res;
      },
      () => {
        this.matSnackBar.open('Error while loading teams', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
  // Function to create a new Project
  onSubmit() {
    if(this.newProject.projectName != "" && this.newProject.projectDesc !=""){
      this.projectService
        .CreateProject(this.newProject.idteam, this.newProject)
        .subscribe(
          (res: any) => {
            this.projectData.push(res);
            this.filtredProjects = this.projectData;
          },
          () => {
            this.matSnackBar.open('Error while creating project', '❌', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        );
    }else{
      this.matSnackBar.open(
        'Please fill all the required fields',
        '❌',
      )
    }
  }
  // Delete Project From DataBase
  deleteProject(item: any) {
    if(confirm("Are sure you want to delete this project ?")){
      this.projectService.Delete(item).subscribe(
        () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/Dashboard/Project']);
            });
        },
        () => {
          this.matSnackBar.open('Error while deleting project', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
  // Remove the duplicates Projects in a list of projects
  removeDuplicates(objects: any[]): any[] {
    return objects.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
  }
}

