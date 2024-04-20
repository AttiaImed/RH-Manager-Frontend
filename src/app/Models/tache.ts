import {Utilisateur} from "./utilisateur";

export class Tache {
  id!: number;
  nom!: string;
  description!: string;
  status!: string;
  progress!: number;
  priority!: string;
  comments!: string;
  dateDebut!: Date;
  dateFin!: Date;
  superviser : Utilisateur = new Utilisateur();
  membres : Utilisateur[] = [];
  sousTaches : Tache[] = [];


}
