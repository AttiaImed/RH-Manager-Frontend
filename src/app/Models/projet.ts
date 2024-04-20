import {Dossier} from "./dossier";
import {Equipe} from "./equipe";

export class Projet {
  id!: number;
  projectName!: string;
  projectDesc!: string;
  status!: string;
  team : Equipe = new Equipe();
  startDate!: Date;
  endDate!: Date;
  dossiers!: Dossier[];

}
