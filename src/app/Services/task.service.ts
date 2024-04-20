import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
const  APIUrlTasks ="http://localhost:8082/api/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService{

  constructor(http:HttpClient,private https:HttpClient) {
    super(APIUrlTasks,http);
  }
  getTasksByUserId(user : String): Observable<any>{
    return this.https.get(APIUrlTasks+"/user/"+user);
  }
  getTasksByProjectIdAndUserId(userId : string , projectId :string): Observable<any>{
    return this.https.get(APIUrlTasks+"/user/"+projectId+"/"+userId);
  }


}
