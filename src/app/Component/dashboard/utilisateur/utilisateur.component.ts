import { Component } from '@angular/core';
import {Reclamation} from "../../../Models/reclamation";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Utilisateur} from "../../../Models/utilisateur";
import {UserService} from "../../../Services/user.service";

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule,
    NgForOf,
    MatIcon],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  listUsers: Utilisateur[]=[];
  selectedReclamation: Utilisateur=new Utilisateur();
  newReclamation: { id: number; type: string; nom: string; prenom: string; email: string; status: boolean }=new Utilisateur();

  constructor(private userSerivce: UserService) {
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

  delete(id:number){
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

  edit(reclamation: Utilisateur) {
    console.log( this.selectedReclamation)

    this.selectedReclamation = reclamation;
  }

  saveChanges() {
    this.userSerivce.Update(this.selectedReclamation.id,this.selectedReclamation).subscribe(
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
