export class Projet {
  idProjet: number;
  nom: string;
  description: string;
  status: string;
  dateDebut: Date;
  dateFin: Date;

  constructor() {
    this.idProjet = 0;
    this.nom = "";
    this.description = "";
    this.status = "";
    this.dateDebut = new Date();
    this.dateFin = new Date();
  }
}
