export class Conge {
 idConge : number
 congeType : string;
 startDate : Date;
 endDate : Date;
 reason : string;
 leaveRequestStatus :string;


  constructor() {
    this.idConge = 0;
    this.congeType = "";
    this.startDate = new Date();
    this.endDate = new Date();
    this.reason = "";
    this.leaveRequestStatus = "";
  }
}
