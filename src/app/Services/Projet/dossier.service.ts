import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {Dossier} from "../../Models/dossier";
import {Observable} from "rxjs";
const APIUrlDossier = "http://localhost:8081/api/Dossier";

@Injectable({
  providedIn: 'root'
})
export class DossierService extends DataService{
  constructor(http:HttpClient,private httpPrivate : HttpClient){
    super(APIUrlDossier,http);
  }
  //Create Method
  CreateFolder(data: any,id : number): Observable<any> {
    console.log(data);
    return this.httpPrivate.post(`${APIUrlDossier}/${id}`, data);
  }


}
