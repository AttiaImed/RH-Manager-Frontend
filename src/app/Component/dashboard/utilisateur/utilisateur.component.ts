import { Component } from '@angular/core';
import {Reclamation} from "../../../Models/reclamation";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Utilisateur} from "../../../Models/utilisateur";
import {UserService} from "../../../Services/user.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule,
    NgForOf,
    CommonModule,
    MatIcon, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  listUsers: Utilisateur[]=[];
  selectedReclamation: Utilisateur=new Utilisateur();
  totalUsers: number = 0;
  activeUsers: number = 0;
  userTypes: { type: string, count: number }[] = [];
  newReclamation: { id: number; type: string; nom: string; prenom: string; email: string; poste:string; status: boolean  }=new Utilisateur();

  constructor(private userSerivce: UserService) {
    this.calculateStatistics();
    this.loadUser();
  }


  loadUser() {
    this.userSerivce.getAll().subscribe(
      (data:Utilisateur[])=>{
        this.listUsers=data;
      },
      (error)=>{
        console.log(error + "User not found");
      }
    );
  }
  calculateStatistics() {
    this.totalUsers = this.listUsers.length;
    console.log("leng",this.listUsers.length)

    // Number of active users
    this.activeUsers = this.listUsers.filter(user => user.status === true).length;

    // Number of users by type
    const userTypesMap = new Map<string, number>();
    this.listUsers.forEach(user => {
      const userType = user.type;
      if (userTypesMap.has(userType)) {
        userTypesMap.set(userType, userTypesMap.get(userType)! + 1);
      } else {
        userTypesMap.set(userType, 1);
      }
    });
    this.userTypes = Array.from(userTypesMap).map(([type, count]) => ({ type, count }));
  }

  delete(id:number){
    this.listUsers=this.listUsers.filter(item=>item.id!==id)
    this.userSerivce.Delete(id).subscribe(
      ()=>{
        const index=this.listUsers.findIndex((user)=>user.id===id);
        if(index !== -1) {
          this.listUsers.splice(index, 1);
          console.log(`User with id ${id} deleted successfully.`);
        }else {
          console.log(`User with id ${id} not found`);
        }
      },
      (error)=>{
        console.log(error);

      }
    );
  }
  selectedUser: Utilisateur = new Utilisateur();

  edit(user: Utilisateur) {
    this.selectedReclamation = { ...user }; // Assign the selected user to the form model
  }

  saveChanges() {
    this.userSerivce.Update(this.selectedReclamation.id, this.selectedReclamation).subscribe(
      () => {
        console.log(`Reclamation with id ${this.selectedReclamation.id} updated successfully.`);
        this.loadUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewReclamation() {
    console.log( this.newReclamation)
    this.userSerivce.Create(this.newReclamation).subscribe(
      (createdReclamation: Reclamation) => {
        console.log(`New reclamation added successfully.`);
        this.newReclamation = {
          id: 0,
          nom: "",
          prenom: "",
          email: "",
          poste: "",
          type:"",
          status: false,
        };
        this.loadUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
