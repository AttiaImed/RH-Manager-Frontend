import {Component, Inject, OnInit} from '@angular/core';
import {Utilisateur} from "../../../../Models/utilisateur";
import {FormsModule} from "@angular/forms";
import {EquipeService} from "../../../../Services/Projet/equipe.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {Projet} from "../../../../Models/projet";

@Component({
  selector: 'app-ajouter-user-team',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './ajouter-user-team.component.html',
  styleUrl: './ajouter-user-team.component.css'
})
export class AjouterUserTeamComponent implements OnInit{
  UsersList: Utilisateur[] = [] as Utilisateur[] ;
  projectList:Projet[]=[] as Projet[];
  selectedUserId !:number;
  selectedProjectId!:number;
  selectedUser!:Utilisateur;
action!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private equipeService: EquipeService,private dialogRef: MatDialogRef<AjouterUserTeamComponent>) {}
  ngOnInit(): void {
    this.action=this.data.action;

    if(this.action=="add user"){
      this.equipeService.getUsers().subscribe((res: any) => {
        this.UsersList = res;
        console.log(this.UsersList);
      });
    }
    else if (this.action=="add project") {
      this.equipeService.getProjects().subscribe((res: any) => {
        this.projectList = res;
      });
    }

  }

  onSubmit() {
    if(this.action=="add user"){
      this.addUser();
    }
    else if (this.action=="add project") {
      this.addProject();
    }

  }
  addUser() {
    console.log(this.selectedUserId);
    this.equipeService.addUser(this.data.teamId,this.selectedUserId).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Team added successfully:', response);
        console.log(this.data)
        this.dialogRef.close();
        this.dialogRef.close('success');
      },
      (error: any) => {
        // Handle error response
        console.error('Error adding team:', error);
      }
    );
  }
  addProject() {
    console.log(this.selectedProjectId);
    this.equipeService.addProject(this.data.teamId,this.selectedProjectId).subscribe(
      (response: any) => {
        // Handle success response
        console.log(this.data.teamId)
        console.log(this.selectedProjectId)
        console.log('project added successfully:', response);
        this.dialogRef.close();
        this.dialogRef.close('success');
      },
      (error: any) => {
        // Handle error response
        console.error('Error adding team:', error);
      }
    );

  }


}
