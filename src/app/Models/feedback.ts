import {Utilisateur} from "./utilisateur";

export class Feedback {
  id !: number;
 libelle !: string;
 dateSoumission!: Date;
  description !: string;
  typeFeedBack!:string;
  utilisateurManagerFeedBack! : Utilisateur;
  utilisateurEmployeFeedBack!: Utilisateur;
}
