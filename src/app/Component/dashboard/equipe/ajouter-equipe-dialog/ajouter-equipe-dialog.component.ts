import {Inject, NgModule} from '@angular/core';

import { FormsModule } from '@angular/forms'; // Import FormsModule



import { Component } from '@angular/core';
import { EquipeService } from '../../../../Services/Projet/equipe.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Utilisateur} from "../../../../Models/utilisateur";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-ajouter-equipe-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './ajouter-equipe-dialog.component.html',
  styleUrl: './ajouter-equipe-dialog.component.css'
})
export class AjouterEquipeDialogComponent {
  teamName: string = '';
  domain: string = '';
  selectedUserId !:number;
  UsersList: Utilisateur[] = [] as Utilisateur[] ;

  constructor(private equipeService: EquipeService,private dialogRef: MatDialogRef<AjouterEquipeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}



  ngOnInit(): void {

    this.equipeService.getUsers().subscribe((res: any) => {
      this.UsersList = res;
      console.log(this.UsersList);
    });


    if(this.data.action==="update") {
      this.teamName = this.data.teamData.nom;
      this.domain = this.data.teamData.domaine;
      this.selectedUserId = this.data.teamData.chef.id;
    }


  }
  onSubmit() {

    const team = {
      nom: this.teamName,
      domaine:this.domain,
      chef: {id:this.selectedUserId}
    };
console.log(this.data)
    if(this.data.action==="update") {
     return  this.updateTeam(team);
      console.log("update this team",team)
    }

      this.addTeam(team);
      console.log("create this team",team)


  }


  addTeam(team: any) {
    this.equipeService.Create(team).subscribe(
      (response: any) => {
        // Handle success response
        console.log(team)
        console.log('Team added successfully:', response);
        this.dialogRef.close();
        this.dialogRef.close('success');
      },
      (error: any) => {
        // Handle error response
        console.error('Error adding team:', error);
      }
    );


  }

  updateTeam(team: any) {
    this.equipeService.Update(this.data.teamData.id,team).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Team updated successfully:', response);
        this.dialogRef.close();
        this.dialogRef.close('success');
      },
      (error: any) => {
        // Handle error response
        console.error('Error updating team:', error);
      }
    );
  }


}
