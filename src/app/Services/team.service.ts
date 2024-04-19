import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
const  APIUrlTeams ="http://localhost:8082/api/Equipe";


@Injectable({
  providedIn: 'root'
})
export class TeamService  extends DataService{
  constructor(http:HttpClient,private https:HttpClient){   super(APIUrlTeams,http);}

  //Get Teams By  Departments Id
  getTeamsByDepId(id : string): Observable<any> {
    return this.https.get(`${APIUrlTeams}/Department/${id}`);
  }

  //Get Teams By userId
  getTeamByUserId(userId: string){
    return this.https.get(`${APIUrlTeams}/user/${userId}`);
  }

  //add Or Remove User from team
  addOrRemoveUser(teamId : string , userId : string){
    return this.https.patch(`${APIUrlTeams}/user/${teamId}/${userId}`,null);
  }

  // add or remove project from team
  addOrRemoveProject(teamId : string , projectId : string){
    return this.https.patch(`${APIUrlTeams}/project/${teamId}/${projectId}`,null);
  }

}
