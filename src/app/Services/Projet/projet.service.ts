import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
const APIUrlProjet = "http://localhost:8081/api/Dossier";
@Injectable({
  providedIn: 'root'
})
export class ProjetService  extends DataService{
    constructor(http:HttpClient){
      super(APIUrlProjet,http);
    }
}
