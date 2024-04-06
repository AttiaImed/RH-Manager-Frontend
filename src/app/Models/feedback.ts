export class Feedback {
 idFeedback : number;
 libelle : string;
 dateSoumission: Date;
 description : string;
 TypeFeed:string;

  constructor() {
    this.idFeedback = 0;
    this.libelle = "";
    this.dateSoumission = new Date();
    this.description = "";
    this.TypeFeed = "";
  }
}
