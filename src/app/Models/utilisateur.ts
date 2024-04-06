export class Utilisateur {
 idUtilisateur : number;
 nom : string;
 prenom : string;
 type : string;
 email : string;
 login : string;
 password : string
 status : boolean;

  constructor() {
    this.idUtilisateur = 0;
    this.nom = "";
    this.prenom = "";
    this.type = "";
    this.email = "";
    this.login = "";
    this.password = "";
    this.status = false;
  }
}
