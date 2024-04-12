import {Conge} from "./conge";

export class Calendrier {
 idCalendrier !:number;
 annee !: number;
 joursFeries : string[]=[];
 evenementsSpeciaux : string[]=[];
 congesPlanifies : Conge[]=[];
 joursOuvrables !: number;


}
