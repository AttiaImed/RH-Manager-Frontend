export class Reclamation {
 idReclamation : number;
 dateSoumission: Date;
 dateCloture: Date;
 titre : string;
 description : string;
 typeRec : string;

  constructor() {
    this.idReclamation = 0;
    this.dateSoumission = new Date();
    this.dateCloture = new Date();
    this.titre = "";
    this.description = "";
    this.typeRec = "";
  }
}
