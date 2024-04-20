import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Projet} from "../../../Models/projet";
import {Dossier} from "../../../Models/dossier";
import {DossierService} from "../../../Services/Projet/dossier.service";
@Component({
  selector: 'app-dossier',
  standalone: true,
  imports: [NgForOf, DatePipe, FormsModule],
  templateUrl: './dossier.component.html',
  styleUrl: './dossier.component.css'
})
export class DossierComponent {
  listDossier: Dossier[] = [];
  selectedDossier: Dossier = new Dossier();
  newDossier: Dossier = new Dossier();

  constructor(private dossierService: DossierService) {
    this.loadDossiers();
  }

  loadDossiers() {
    this.dossierService.getAll().subscribe(
      (data: Dossier[]) => {
        this.listDossier = data;
      },
      (error) => {
        console.log(error + "not dossier found");
      }
    );
  }

  delete(id: number) {
    this.dossierService.Delete(id).subscribe(
      () => {
        const index = this.listDossier.findIndex((dossier) => dossier.id === id);
        if (index !== -1) {
          this.listDossier.splice(index, 1);
          console.log(`Dossier with id ${id} deleted successfully.`);
        } else {
          console.log(`Dossier with id ${id} not found.`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit(dossier: Dossier) {
    this.selectedDossier = { ...dossier };
  }

  saveChanges() {
    this.dossierService.Update(this.selectedDossier.id,this.selectedDossier).subscribe(
      () => {
        console.log(`Dossier with id ${this.selectedDossier.id} updated successfully.`);
        // Reload dossiers
        this.loadDossiers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewDossier() {
    this.dossierService.Create(this.newDossier).subscribe(
      (createdDossier: Dossier) => {
        console.log(`New dossier added successfully.`);
        // Clear newDossier and reload dossiers
        this.newDossier = {
          goals: "", id: 0, nom: "", num: 0, progress: 0, status: "", taches: []


        };
        this.loadDossiers();
      },

      (error) => {
        console.log(error);
      }
    );
  }

}
