import { Component } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {TokenStorageService} from "../../../../Services/token.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProjectService} from "../../../../Services/project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "../../../../Services/task.service";
import {UserService} from "../../../../Services/user.service";
import {Utilisateur} from "../../../../Models/utilisateur";
import {Projet} from "../../../../Models/projet";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Dossier} from "../../../../Models/dossier";
import {Tache} from "../../../../Models/tache";
import {DossierService} from "../../../../Services/Projet/dossier.service";

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatIcon,
    DatePipe,
    MatProgressBar,
    RouterLink,
    NgForOf
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  id!: any;
  projectData: Projet = new Projet();
  folders: Dossier[] = [];
  currentFolder: Dossier = new Dossier();
  openTasks: Tache[] = [];
  inProgressTasks: any = [];
  completedTasks: any = [];
  inputGoals: boolean = false;
  inputProject: boolean = false;
  goals: string = '';
  newFolder :Dossier= {
    goals: "", id: 0, nom: "", num: 0, progress: 0, status: "", taches: []
  };

  editProject() {
    this.inputProject = true;
  }

  userIds: any[] = [];

  projectMembers: any[] = [];

  users!: Utilisateur[];
  selectedUsers: string[] = [];
  newTask :Tache = {
    comments: "",
    dateDebut: new Date(),
    dateFin: new Date(),
    description: "",
    dossier: new Dossier(),
    id: 0,
    membres: [],
    nom: "",
    priority: "",
    progress: 0,
    sousTaches: [],
    status: "",
    superviser: new Utilisateur()

  }
  constructor(
    private tokenStorage: TokenStorageService,
    public ar: ActivatedRoute,
    private projectService: ProjectService,
    private dossierService : DossierService,
    private router: Router,
    private userService: UserService,
    private todoService: TaskService,
    private matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.getProjectData();
  }
  // checkUser() {
  //   if (this.accessUser || this.projectData.team === undefined) {
  //   } else if (
  //     this.projectData.team.usersId.indexOf(
  //       this.tokenStorage.getUser() as string
  //     ) !== -1
  //   ) {
  //   } else {
  //     this.matSnackBar.open("You don't have access to this project", '❌');
  //     setTimeout(() => {
  //       this.router.navigate(['/Dashboard/Project']);
  //     }, 500);
  //   }
  // }
  //Get All Project Data
  getProjectData(id: any = this.id) {
    this.projectService.get(id).subscribe(
      (response : Projet) => {
        this.projectData = response;
        console.log(response);
        this.folders = response.dossiers;
        this.currentFolder = response.dossiers[0];
        this.splitData(response.dossiers[0]);
      },
      () => {
        this.matSnackBar.open('Error while trying to get Project data', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
  // Split the tasks By it's status
  splitData(item: Dossier) {
    this.currentFolder = item;
    console.log(this.currentFolder);
    if (this.currentFolder.taches.length > 0) {
      this.openTasks = this.currentFolder.taches.filter(
        (todo: any) => todo.status === 'OPEN_TASK'
      );
      console.log(this.openTasks);
      this.inProgressTasks = this.currentFolder.taches.filter(
        (todo: any) => todo.status === 'IN_PROGRESS'
      );
      this.completedTasks = this.currentFolder.taches.filter(
        (todo: any) => todo.status === 'DONE'
      );
      this.currentFolder.num = Math.round(
        (100 * this.completedTasks.length) /
        (this.openTasks.length +
          this.inProgressTasks.length +
          this.completedTasks.length)
      );
      setTimeout(() => {
        this.openTasks.forEach((item: any) => {
          item.userIds.forEach((userId: string) => {
            //this.fetchProfilePicture(userId);
          });
        });
        this.inProgressTasks.forEach((item: any) => {
          item.userIds.forEach((userId: string) => {
            //this.fetchProfilePicture(userId);
          });
        });
        this.completedTasks.forEach((item: any) => {
          item.userIds.forEach((userId: string) => {
            //this.fetchProfilePicture(userId);
          });
        });
      }, 50);
    } else {
      this.currentFolder.num = 0;
      this.openTasks = [];
      this.inProgressTasks = [];
      this.completedTasks = [];
    }
  }
  // Function to Edit Goal of the Folder
  editGoal() {
    this.inputGoals = true;
    this.goals = this.currentFolder.goals;
  }
  // add new Folder to the project
  addFolder() {
    if(this.newFolder.nom !=""){

      this.dossierService.CreateFolder(this.newFolder,this.id).subscribe(
        (res: any) => {
          window.location.reload();
        },
        () => {
          this.matSnackBar.open(
            'Error while trying to creating new Folder',
            '❌',
            {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
        }
      );
    }else{
      this.matSnackBar.open(
        'Please Enter Folder Name',
        '❌',
      )
    }
  }
  // Updating a folder in dataBase
  updateFolder(status: any = this.currentFolder.status) {
    this.currentFolder.status = status;
    this.goals != ''
      ? (this.currentFolder.goals = this.goals)
      : (this.currentFolder.goals);
    console.log(this.currentFolder)
    this.dossierService.Update(this.currentFolder.id, this.currentFolder).subscribe(
      (res: any) => {
        this.inputGoals = false;
        window.location.reload();
      },
      () => {
        this.matSnackBar.open('Error while trying to Updating Folder', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  //Get users in case the Team Leader of Higher granted roles want to add new task
  getusers() {
    this.projectMembers = [];
    console.log(this.projectData)
    this.userIds = [1,2,3];
    this.userIds.forEach((el: any) => {
      this.userService.get(el).subscribe(
        (res: Utilisateur) => {
          this.projectMembers.push(res);
        },
        () => {
          this.matSnackBar.open('Error while trying to get Users', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    });
  }

  //on Check the box get the selected Users
  onCheckboxChange(event: any, user: any) {
    if (event.target.checked) {
      this.selectedUsers.push(user.userId);
    } else {
      const index = this.selectedUsers.indexOf(user.userId);
      if (index >= 0) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }

  // Save the new task
  saveTask() {
    if(this.newTask.nom !="" && this.newTask.description !=""){
      //this.newTask.u = this.selectedUsers as [];
      this.newTask.nom = this.currentFolder.nom;
      const userAuth = this.tokenStorage.getUser();
      this.newTask.status = "OPEN_TASK";
//      this.newTask.supervisorId = String(userAuth);
 //     this.newTask.projectId = this.id;
      this.todoService.CreateTask(this.currentFolder.id,this.newTask).subscribe(
        (res: any) => {
          this.getProjectData();
        },
        () => {
          this.matSnackBar.open('Error while Saving the Task in DataBase', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }else{
      this.matSnackBar.open(
        "Don't leave Empty fields",
        "Close"
      )
    }
  }

  // Delete a selected Task
  deleteTask(id: any) {
    if(confirm("Are you sure you want to delete this task ??")){
      this.todoService.Delete(id).subscribe(
        () => {
          this.getProjectData();
          this.matSnackBar.open('Task Deleted Successfully', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        (error) => {
          this.matSnackBar.open('Error', 'Close');
        }
      );
    }
  }
  // Update Project infos
  // updateProject() {
  //   if(this.projectData.projectName != ""&& this.projectData.projectDesc !=""){
  //     this.projectService.Update(this.projectData.id, this.projectData).subscribe(
  //       (res: any) => {
  //         this.inputProject = false;
  //         this.projectData = res;
  //         this.matSnackBar.open('Project Updated Successfully', '❌', {
  //           duration: 2000,
  //           panelClass: ['red-snackbar'],
  //           horizontalPosition: 'right',
  //           verticalPosition: 'top',
  //         });
  //       },
  //       () => {
  //         this.matSnackBar.open('Error while Updating project', '❌', {
  //           duration: 2000,
  //           panelClass: ['red-snackbar'],
  //           horizontalPosition: 'right',
  //           verticalPosition: 'top',
  //         });
  //       }
  //     );
  //   }else{
  //     this.matSnackBar.open(
  //       "Don't leave Empty fields",
  //       "Close"
  //     )
  //   }
  // }

  // get Profile Picture
  // Define a property to store the profile picture URLs
  userProfilePictures: { [userId: string]: SafeUrl } = {};

  // Call the function to fetch the profile picture for a user
  // fetchProfilePicture(userId: string): void {
  //   this.userService.getFile(userId).subscribe(
  //     (res: any) => {
  //       let objectURL = URL.createObjectURL(res);
  //       this.userProfilePictures[userId] =
  //         this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     },
  //     (error) => {
  //       this.userProfilePictures[userId] = LogoImgPath;
  //     }
  //   );
  // }
}
