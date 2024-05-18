import { ApprovalStatus } from "./approval-status.enum";
import { Utilisateur } from "./utilisateur";

export class Conge{
  id!:number;
  dateDebut!:Date;
  dateFin!:Date;
  type!:string;
  description!:string;
  status!:ApprovalStatus;
  utilisateur!: Utilisateur
}
