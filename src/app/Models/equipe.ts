import {Projet} from "./projet";
import {Utilisateur} from "./utilisateur";

export class Equipe {
  id!: number;
  nom!: string;
  status!: string;
  projets: Projet[]=[];
  membres: Utilisateur[]=[];
  chef!: Utilisateur;


}
