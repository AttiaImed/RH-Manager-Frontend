import {Projet} from "./projet";
import {Utilisateur} from "./utilisateur";

export class Equipe {
  id: number;
  nom: string;
  status: string;
  projets: Projet[];
  membres: Utilisateur[];
  chef: Utilisateur;

  constructor() {
    this.id = 0;
    this.nom = "";
    this.status = "";
    this.projets = [];
    this.membres = [];
    this.chef = new Utilisateur();
  }

  addProject(project: Projet) {
    if (this.projets.length === 0) {
      this.projets.unshift(project);
    } else {
      this.projets.push(project);
    }
  }
}
