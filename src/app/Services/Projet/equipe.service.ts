import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Equipe } from '../../Models/equipe';
const APIUrlEquipe = "http://localhost:8081/api/Equipe";
@Injectable({
  providedIn: 'root'
})
export class EquipeService extends DataService  {
    constructor( http:HttpClient,private  https:HttpClient){
        super(APIUrlEquipe,http)
    }
//Get Teams By  Departments Id
  getTeamsByDepId(id : string): Observable<any> {
    return this.https.get(`${APIUrlEquipe}/Department/${id}`);
  }

  //Get Teams By userId
  getTeamByUserId(userId: string){
    return this.https.get(`${APIUrlEquipe}/user/${userId}`);
  }

  //add Or Remove User from team
  addOrRemoveUser(teamId: number, userId: number){
    return this.https.patch(`${APIUrlEquipe}/user/${teamId}/${userId}`,null);
  }

  // add or remove project from team
  addOrRemoveProject(teamId: number, projectId: string){
    return this.https.patch(`${APIUrlEquipe}/project/${teamId}/${projectId}`,null);
  }

}
