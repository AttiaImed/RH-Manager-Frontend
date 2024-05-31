
import { Component } from '@angular/core';
import {Reclamation} from "../../../Models/reclamation";
import {ReclamationService} from "../../../Services/Reclamation/reclamation.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {SearchPipe} from "../../../search.pipe";
import {TokenStorageService} from "../../../Services/token.service";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatIcon,
    NgIf,
    SearchPipe,
    NgxPaginationModule
  ],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  listReclamation: Reclamation[]=[];
  selectedReclamation: Reclamation=new Reclamation();
  p:number=1;
filteredFeedback : Reclamation[]=[];

  newReclamation: {
    dateSoumission: Date;
    titre: string;
    typeReclamation: string;
    description: string;
    id: number;
    dateCloture: Date
    status:string
    utilisateurReclamation : any;
  }=new Reclamation();
  editStatusId: any;// Initialisé à null au lieu de undefined
  searchText='';
  isLoggedIn : string ="";
  constructor(private reclamationService: ReclamationService , private tokenStorage : TokenStorageService) {
    this.loadReclamations();
    this.isLoggedIn =this.tokenStorage.getRole();
  }


  loadReclamations() {
    this.reclamationService.getAll().subscribe(
      (data:Reclamation[])=>{
        this.listReclamation=data;
        this.filteredFeedback=data;
      },

      (error)=>{
        console.log(error + "reclamation not found");
      }
    );
  }



  delete(id:number){
    this.reclamationService.Delete(id).subscribe(
      ()=>{
        const index=this.listReclamation.findIndex((reclamation)=>reclamation.id===id);
        if(index !== -1) {
          this.listReclamation.splice(index, 1);
          console.log(`Reclamation with id ${id} deleted successfully.`);
        }else {
          console.log(`Reclamation with id ${id} not found`);
        }
      },
      (error)=>{
        console.log(error);

      }
    );
  }

  edit(reclamation: Reclamation) {
    console.log( this.selectedReclamation)

    this.selectedReclamation = reclamation;
  }

  saveChanges() {
    this.reclamationService.Update(this.selectedReclamation.id, this.selectedReclamation).subscribe(
      () => {
        console.log(`Reclamation with id ${this.selectedReclamation.id} updated successfully.`);
        this.loadReclamations();
        // Check if the status changed
        if (this.selectedReclamation.status !== 'Pending') {
          // Update the status locally
          const index = this.listReclamation.findIndex((reclamation) => reclamation.id === this.selectedReclamation.id);
          if (index !== -1) {
            this.listReclamation[index].status = this.selectedReclamation.status;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewReclamation() {
    console.log(this.newReclamation);
    // Vérifier si la réclamation existe déjà dans la liste
    const existingReclamationIndex = this.listReclamation.findIndex(reclamation =>
      reclamation.titre === this.newReclamation.titre &&
      reclamation.description === this.newReclamation.description &&
      reclamation.typeReclamation === this.newReclamation.typeReclamation
    );

    if (existingReclamationIndex === -1) {
      this.newReclamation.utilisateurReclamation= {
        id : this.tokenStorage.getUser()
      }
      console.log(this.newReclamation)
      // Si la réclamation n'existe pas dans la liste, l'ajouter
      this.reclamationService.Create(this.newReclamation).subscribe(
        (createdReclamation: Reclamation) => {
          this.loadReclamations();
          //window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Si la réclamation existe déjà dans la liste, afficher un message ou une action appropriée
      console.log("Cette réclamation existe déjà.");
      // Ou mettez à jour la réclamation existante avec les nouvelles données
      this.updateExistingReclamation(existingReclamationIndex);
    }
  }

  updateExistingReclamation(index: number) {
    this.reclamationService.Create(this.newReclamation).subscribe(
      (updatedReclamation: Reclamation) => {
        console.log(`Reclamation updated successfully.`);
        this.listReclamation[index] = updatedReclamation; // Mettre à jour la réclamation existante dans la liste
        this.clearNewReclamationFields(); // Réinitialiser les champs de la nouvelle réclamation
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearNewReclamationFields() {
    this.newReclamation = {
      id: 0,
      dateSoumission: new Date(),
      dateCloture: new Date(),
      titre: "",
      description: "",
      typeReclamation: "",
      status: "" ,// Réinitialiser le statut,
      utilisateurReclamation : {
        id : this.tokenStorage.getUser()
      }
    };
  }

  setEditStatusId(reclamationId: number) {
    this.editStatusId = reclamationId;

  }
  clearEditStatusId() {
    this.editStatusId.utilisateurReclamation = null;
    console.log( this.editStatusId)

    this.reclamationService.Update(this.editStatusId.id, this.editStatusId).subscribe((res : any)=>{
      console.log(res);
      window.location.reload();
    })
    this.editStatusId = null;
  }
  setPage(event : number){
    this.p = event
  }

}
