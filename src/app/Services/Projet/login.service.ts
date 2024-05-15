import { Injectable } from '@angular/core';
const APIUrlLoginSignup = "http://localhost:8081/api/Utilisateur";
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService{
  constructor(http:HttpClient){
    super(APIUrlLoginSignup,http);
  }
}
