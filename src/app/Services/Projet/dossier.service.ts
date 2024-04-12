import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
const APIUrlDossier = "http://localhost:8081/api/Dossier";

@Injectable({
  providedIn: 'root'
})
export class DossierService extends DataService{
  constructor(http:HttpClient){
    super(APIUrlDossier,http);
  }
}
