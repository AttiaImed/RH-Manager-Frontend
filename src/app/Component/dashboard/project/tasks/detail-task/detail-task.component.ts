import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Utilisateur} from "../../../../../Models/utilisateur";
import {SousTache} from "../../../../../Models/sousTache";
import {Tache} from "../../../../../Models/tache";
import {TaskService} from "../../../../../Services/task.service";
import {UserService} from "../../../../../Services/user.service";
import {ProjectService} from "../../../../../Services/project.service";
import {TokenStorageService} from "../../../../../Services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    MatDivider,
    MatListItem,
    MatList,
    MatIcon,
    MatProgressBar,
    NgForOf,
    MatListSubheaderCssMatStyler,
    JsonPipe
  ],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent {
  id!: any;
  todoData: Tache = new Tache();
  taskMembers: any[] = [];
  superViser!: Utilisateur;
  check: boolean = false;
  newCheck: string = '';
  editTask: boolean = false;
  projectMembers: any[] = [];
  selectedUsers: string[] = [];
  currentDate = new Date();


  constructor(
    public ar: ActivatedRoute,
    private todosService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private tokenStorage: TokenStorageService,
    private matSnackBar: MatSnackBar,
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.todosService.get(this.id).subscribe((res) => {
      console.log(res)
      this.todoData = res;
      this.getusers();
    });
  }
  //Make a Sub-Task as Done
  markSubTaskAsDone() {
    this.todoData.status = 'completed';
    this.todosService.Update(null, this.todoData).subscribe(
      (res: any) => {
        this.todoData = res;
      },
      () => {
        this.matSnackBar.open(
          'Error while Updating Task Please try again',
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
  }
  // Function detect the changes on the Sub-task
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
  // All Updates on the checklist
  changechecklist(i: any) {
    this.todoData.progress =
      this.todoData.progress + 100 / this.todoData.sousTaches.length > 100
        ? 100
        : this.todoData.progress + 100 / this.todoData.sousTaches.length;
    this.todoData.sousTaches[i].checked = true;
    // this.todoData.sousTaches[i].updated = new Date();
    // this.todoData.sousTaches[i].userId = this.tokenStorage.getUser() as string;
    this.todoData.status == 'open'
      ? (this.todoData.status = 'inProgress')
      : null;
    this.todosService.Update(null, this.todoData).subscribe(
      (res: any) => {
        this.todoData = res;
      },
      () => {
        this.matSnackBar.open('Error while Updating Task', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
  // Delete Sub-Task
  deleteCheck(i: any) {
    if(confirm("Are you sure you want to delete this subtask ??")){
      this.todoData.sousTaches.splice(i, 1);
      this.todosService.Update(null, this.todoData).subscribe(
        (res: any) => {
          this.todoData = res;
          this.resetProgress();
        },
        () => {
          this.matSnackBar.open('Error while Deleting Sub-Task', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
  // Switch Editing Mode
  switchCheck() {
    this.check = !this.check;
  }
  // Add new Sub-Task
  addCheck() {
    if(this.newCheck !=""){
      // this.todoData.sousTaches?.length == null
      //   ? (this.todoData.sousTaches = [{ check: false, text: this.newCheck : this.currentDate}])
      //   : this.todoData.sousTaches.push({ check: false, text: this.newCheck : this.currentDate });
      this.todoData.progress =
        this.todoData.progress + 100 / this.todoData.sousTaches.length > 100
          ? 100
          : this.todoData.progress + 100 / this.todoData.sousTaches.length;
      this.todosService.Update(null, this.todoData).subscribe(
        (res: any) => {
          this.todoData = res;
          this.switchCheck();
          this.resetProgress();
          this.matSnackBar.open('new Sub-Task created', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        () => {
          this.matSnackBar.open('Error while adding new Sub-Task', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
      this.newCheck = '';
    }else{
      this.matSnackBar.open(
        'Please enter a valid Sub-Task',
        '❌',
      )
    }
  }
  // Get Users Related to the current task
  getusers() {
    this.userService.get(this.todoData.id).subscribe(
      (res: Utilisateur) => {
        this.superViser = res;
      },
      () => {
        this.matSnackBar.open(
          'Error while trying to get Superviser infos',
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
    this.todoData.membres.forEach((el: any) => {
      // this.userService.get(el.id).subscribe(
      //   (res: Utilisateur) => {
      //     this.taskMembers.push(res);
      //   },
      //   () => {
      //     this.matSnackBar.open('Error while trying to get users', '❌', {
      //       duration: 2000,
      //       panelClass: ['red-snackbar'],
      //       horizontalPosition: 'right',
      //       verticalPosition: 'top',
      //     });
      //   }
      // );
    });
  }
  //Get all Team Members in cas the Team Leader want to Add a new User to the task
  getMembers() {
    this.projectMembers = [];
    this.projectService.get(this.todoData).subscribe(
      (res: any) => {
        res.team.usersId.forEach(
          (element: string) => {
            this.userService.get(element).subscribe((res: Utilisateur) => {
              this.projectMembers.push(res);
            });
          },
          () => {
            this.matSnackBar.open('Error while trying to get users', '❌', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        );
      },
      () => {
        this.matSnackBar.open('Error while trying to get main Ptoject', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
  // Update Task
  EditTask() {
    if (this.editTask == false) {
      this.editTask = true;
      this.getMembers();
    } else {
      if(this.todoData.nom !="" && this.todoData.description !=""){
        this.todoData.membres = this.selectedUsers as [];
        this.todosService.Update(null, this.todoData).subscribe(
          (res: any) => {
            this.todoData = res;
            this.taskMembers = [];
            this.editTask = false;
            this.getusers();
          },
          () => {
            this.matSnackBar.open('Error while Updating Tasks', '❌', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        );
      }
    }
  }
  // Function that always control the progress of the Task
  resetProgress() {
    this.todoData.progress = 0;
    let i = 0;
    this.todoData.sousTaches.forEach((el: any) => {
      if (el.checked == true) {
        i++;
      }
    });
    this.todoData.progress = (i * 100) / this.todoData.sousTaches.length;
    this.todosService.Update(null, this.todoData).subscribe(
      (res: any) => {
        this.todoData = res;
      },
      () => {
        this.matSnackBar.open('Error while Updating Task', '❌', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
  //View CheckList Infos
  viewInfo(item : SousTache){
    let userName ="";
    this.userService.get(item.text).subscribe((res : Utilisateur)=>{
      userName = res.nom + ' ' + res.prenom;
      this.matSnackBar.open(
        'Validated at : '  + ' by ' + userName+"/ Sub-Task Name : "+item.text,
        '❌',
        {
          duration: 10000,
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
    })

  }
}
