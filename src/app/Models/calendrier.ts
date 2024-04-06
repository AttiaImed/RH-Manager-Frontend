import {Conge} from "./conge";

export class Calendrier {
 idCalendrier :number;
 annee : number;
 joursFeries : string[];
 evenementsSpeciaux : string[];
 congesPlanifies : Conge[];
 joursOuvrables : number;

  constructor() {
    this.idCalendrier = 0;
    this.annee = 0;
    this.joursFeries = [];
    this.evenementsSpeciaux = [];
    this.congesPlanifies = [];
    this.joursOuvrables = 0;
  }
}
