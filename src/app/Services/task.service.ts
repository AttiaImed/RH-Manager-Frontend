import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
const  APIUrlTeams ="http://localhost:8082/api/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService{

  constructor(http:HttpClient){   super(APIUrlTeams,http);}
}
