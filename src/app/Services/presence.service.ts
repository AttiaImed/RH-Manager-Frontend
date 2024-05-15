import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token.service";
const  APIUrl ="http://localhost:8081/api/Presence";

@Injectable({
  providedIn: 'root'
})
export class PresenceService extends DataService{
  constructor(http:HttpClient,private https:HttpClient,private tokenService : TokenStorageService){
    super(APIUrl,http);
  }
  getPresenceByUser(){
    const userId = this.tokenService.getUser();
    return this.https.get<any[]>(`${APIUrl}/user/${userId}`);
  }
}
