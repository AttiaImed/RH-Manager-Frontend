import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
const APIUrlReclamation = "http://localhost:8081/api/Reclamation";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService extends DataService{

  constructor(http:HttpClient) {
    super(APIUrlReclamation,http);
  }
}
