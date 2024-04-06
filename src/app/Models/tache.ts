export class Tache {
 idTache : number;
 nom : string;
 description :string;
 status : string;
 supervisorId : number;
 progress : number;
 priority : boolean;
 comments : string;
 startTime : Date;
 endTime : Date;


  constructor() {
    this.idTache = 0;
    this.nom = "";
    this.description = "";
    this.status = "";
    this.supervisorId = 0;
    this.progress = 0;
    this.priority = false;
    this.comments = "";
    this.startTime = new Date();
    this.endTime = new Date();
  }
}
