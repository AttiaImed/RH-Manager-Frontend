import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
const  APIUrlTasks ="http://localhost:8081/api/Tasks";


@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService{

  constructor(http:HttpClient,private https:HttpClient) {
    super(APIUrlTasks,http);
  }
  getTasksByUserId(user : number): Observable<any>{
    return this.https.get(APIUrlTasks+"/user/"+user);
  }
  getTasksByProjectIdAndUserId(userId : number , projectId :string): Observable<any>{
    return this.https.get(APIUrlTasks+"/user/"+projectId+"/"+userId);
  }

  CreateTask(idProject : any,task : any){
    return this.https.post(APIUrlTasks+"/"+idProject,task);
  }

}
