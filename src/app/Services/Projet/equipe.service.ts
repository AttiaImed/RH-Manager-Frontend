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
  getTeamsByDepId(ids : string): Observable<any> {
    let id = parseInt(ids);
    return this.https.get(`${APIUrlEquipe}/Department/${id}`);
  }
  getTeamManager(ids : string): Observable<any> {
      let id = parseInt(ids);
    return this.https.get(`${APIUrlEquipe}/teamManager/${id}`);
  }
  getTeamMembers(ids : string): Observable<any> {
    let id = parseInt(ids);
    return this.https.get(`${APIUrlEquipe}/teamMembers/${id}`);
  }
  getTeamProjects(id : string): Observable<any> {
    return this.https.get(`${APIUrlEquipe}/teamProjects/${id}`);
  }
  //Get Teams By userId
  getTeamByUserId(userId: string){
    return this.https.get(`${APIUrlEquipe}/user/${userId}`);
  }

  //add Or Remove User from team
  addOrRemoveUser(teamId: number, userId: number){
    return this.https.patch(`${APIUrlEquipe}/addOrRemoveUser/${teamId}/${userId}`,null);
  }

  // add or remove project from team
  getUsers(){
    return this.https.get(`${APIUrlEquipe}/getUsers`);
  }
  getProjects(){
    return this.https.get(`${APIUrlEquipe}/getProjects`);
  }
  addUser(teamId: number, userId: number){
    return this.https.patch(`${APIUrlEquipe}/addMembre/${teamId}/${userId}`,null);
  }
  deleteUser(teamId: number, userId: number){
    return this.https.patch(`${APIUrlEquipe}/deleteMembre/${teamId}/${userId}`,null);
  }
  addProject(teamId: number, projectId: number){
    return this.https.patch(`${APIUrlEquipe}/addProject/${teamId}/${projectId}`,null);
  }
  deleteProject(teamId: number, projectId: number){
    return this.https.patch(`${APIUrlEquipe}/deleteProject/${teamId}/${projectId}`,null);
  }
  SaveActionHistory(action: string, actionDetails: string, userId: number ,Date:Date){
    return this.https.post(`${APIUrlEquipe}/actionHistory`,{action: action, actionDetails: actionDetails, userId: userId});
  }

}
