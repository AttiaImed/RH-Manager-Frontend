import { Component } from '@angular/core';
import {ProjetService} from "../../../Services/Projet/projet.service";
import {Projet} from "../../../Models/projet";
import {Dossier} from "../../../Models/dossier";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [NgForOf, DatePipe, FormsModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.css'
})
export class ProjetComponent {
  listProjet: Dossier[] = [];
  constructor(private projetService: ProjetService) {
    this.projetService.getAll().subscribe(
      (data: Dossier[]) => {
              this.listProjet = data;
              console.log(data)
            },
    (error) => {
              console.log(error + "not dossier found");
          }
    );
  }
  selected_item: Projet = {
    dateDebut: new Date(), dateFin: new Date(), description: "", idProjet: 0, nom: "", status: ""
  };


  delete(arg0: number) {
    const index = this.listProjet.findIndex(
      (projet) => projet.id === arg0
    );
    if (index !== -1) {
      this.listProjet.splice(index, 1); // Remove one item at the found index
      console.log(`Privilege with id ${arg0} deleted successfully.`);
    } else {
      console.log(`Privilege with id ${arg0} not found.`);
    }
  }
  edit(_t12: Dossier) {
  }
  saveChanges() {
    // const index = this.listProjet.findIndex(
    //   (projet) => projet.id === this.selected_item.
    // );
    // if (index !== -1) {
    //   this.listProjet[index].projet = this.selected_item.
    //   console.log(
    //     `Privilege with id ${this.selected_item.id} modified successfully.`
    //   );
    // } else {
    //   console.log(`Privilege with id ${this.selected_item.id} not found.`);
    // }
  }

}
