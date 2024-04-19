import { Component } from '@angular/core';
import {Reclamation} from "../../../Models/reclamation";
import {ReclamationService} from "../../../Services/Reclamation/reclamation.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  listReclamation: Reclamation[]=[];
  selectedReclamation: Reclamation=new Reclamation();
  newReclamation: Reclamation=new Reclamation();
  constructor(private reclamationService: ReclamationService) {
    this.loadReclamations();
  }

   loadReclamations() {
    this.reclamationService.getAll().subscribe(
      (data:Reclamation[])=>{
        this.listReclamation=data;
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
    this.reclamationService.Update(this.selectedReclamation.id,this.selectedReclamation).subscribe(
      () => {
        console.log(`Reclamation with id ${this.selectedReclamation.id} updated successfully.`);
        this.loadReclamations();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewReclamation() {
    console.log( this.newReclamation)
    this.reclamationService.Create(this.newReclamation).subscribe(
      (createdReclamation: Reclamation) => {
        console.log(`New reclamation added successfully.`);
        this.newReclamation = {
          id: 0,
          dateSoumission: new Date(),
          dateCloture: new Date(),
          titre: "",
          description:"",
          typeRec: "",
        };
        this.loadReclamations();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
