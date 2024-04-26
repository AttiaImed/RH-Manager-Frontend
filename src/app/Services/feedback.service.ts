import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
const  APIUrlFeedBacks ="http://localhost:8081/api/FeedBack";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends DataService{
  constructor(http:HttpClient,private https:HttpClient){
    super(APIUrlFeedBacks,http);
  }
}
