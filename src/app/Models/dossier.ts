import {Tache} from "./tache";
import {Projet} from "./projet";

export class Dossier {
  id!: number;
  num!: number;
  nom!: string;
  taches: Tache[] =[];
  goals!: string;
  status!: string;
  progress!: number;

}
