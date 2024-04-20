import { Component } from '@angular/core';
import {TaskService} from "../../../../../Services/task.service";
import {TokenStorageService} from "../../../../../Services/token.service";
import {ProjectService} from "../../../../../Services/project.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    MatProgressBar,
    MatIcon,
    NgIf,
    NgForOf
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  fixsedTodoList: any[] = [];
  todoList: any[] = [];
  projects: any[] = [];
  userId!: string | null;
  projectChosen!: any;
  statusChosen: any = 'all';

  constructor(
    private todoService: TaskService,
    private tokenStorage: TokenStorageService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {
    this.userId = this.tokenStorage.getUser();
    this.getTodosByUser();
    this.getProjectByUser();
    this.route.queryParams.subscribe((params) => {
      if (params['projectName'] != null && params['projectId'] != null) {
        this.projectChosen = this.projects.filter((el) => {
          el.id == params['projectName'];
        });
        this.getTodosByProjectId(params['projectId'], params['projectName']);
      }
    });
  }

  //Get All projects belong to the current authenticated user
  getProjectByUser() {
    this.projectService
      .getProejctByUserId(this.tokenStorage.getUser() as string)
      .subscribe(
        (res: any) => {
          this.projects = res;
        },
        () => {
          this.matSnackBar.open('Error while trying to get Projects', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }

  //Get All Tasks related to the current Authenticated user
  getTodosByUser() {
    this.todoService
      .getTasksByUserId(this.tokenStorage.getUser() as string)
      .subscribe(
        (res: any) => {
          this.todoList = res;
          this.fixsedTodoList = res;
        },
        () => {
          this.matSnackBar.open('Error while trying to get Tasks', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }
  //Get All Tasks By Project Id
  getTodosByProjectId(projectId: any, ProjectName: any) {
    this.projectChosen = ProjectName;
    this.todoService
      .getTasksByProjectIdAndUserId(
        this.tokenStorage.getUser() as string,
        projectId
      )
      .subscribe(
        (res: any) => {
          this.todoList = res;
          this.fixsedTodoList = res;
          this.getTodosByStatus();
        },
        () => {
          this.matSnackBar.open('Error while trying to get Tasks', '❌', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }

  //Filter Tasks By Status
  getTodosByStatus(status: any = this.statusChosen) {
    this.statusChosen = status;
    this.todoList = this.fixsedTodoList;
    if (status != 'all') {
      this.todoList = this.todoList.filter(
        (todo: any) => todo.status === this.statusChosen
      );
    }
  }

  //Count the remaining CheckLists
  countCheckList(item: any) {
    let count = 0;
    if (item.checkList) {
      item.checkList.forEach((check: any) => {
        if (check.check == true) {
          count++;
        }
      });
      return count + '/' + item.checkList.length;
    } else {
      return '0 /0';
    }
  }
}



