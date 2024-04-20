import { Component } from '@angular/core';
import {ProjetService} from "../../../Services/Projet/projet.service";
import {Projet} from "../../../Models/projet";
import {Dossier} from "../../../Models/dossier";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import {Utilisateur} from "../../../Models/utilisateur";

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
  selected_item: {
    dossiers: any[];
    endDate: Date;
    projectDesc: string;
    id: number;
    team: { projets: any[]; chef: Utilisateur; id: number; nom: string; membres: any[]; status: string };
    projectName: string;
    startDate: Date;
    status: string
  } = {
    dossiers: [],
    endDate: new Date(),
    id: 0,
    projectDesc: "",
    projectName: "",
    startDate: new Date(),
    status: "",
    team: {
      id: 0,
      nom: '',
      status: '',
      projets: [],
      membres: [],
      chef: new Utilisateur()
    }
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
