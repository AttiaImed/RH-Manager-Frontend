import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
const  APIUrlProjects ="http://localhost:8081/api/Project";


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends DataService{
  constructor(http:HttpClient,private https:HttpClient){
      super(APIUrlProjects,http);
  }

  CreateProject(idteam : any,project : any){
    return this.https.post(APIUrlProjects+"/"+idteam,project);
  }

  addNewFloder(idProject :any,folder :any){
    return this.https.patch(APIUrlProjects+"/addfolder/"+idProject,folder);
  }

  updateFolder(idProject :any,folder :any){
    return this.https.patch(APIUrlProjects+"/folder/"+idProject,folder);
  }
  getProejctByUserId(userId : number){
    return this.https.get(APIUrlProjects+"/user/"+userId);
  }
  getProejctBySuperviserId(userId : number){
    return this.https.get(APIUrlProjects+"/superviser/"+userId);
  }
}

