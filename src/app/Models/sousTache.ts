import {Utilisateur} from "./utilisateur";

export class SousTache {
  id!: number;
  text: string ='';
  checked!: boolean;
  updatedAt!: Date;
  user : Utilisateur = new Utilisateur();

}
