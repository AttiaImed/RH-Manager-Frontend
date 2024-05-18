import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const  APIUrlFeedBacks ="http://localhost:8081/api/FeedBack";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends DataService{
  constructor(http:HttpClient,private https:HttpClient){
    super(APIUrlFeedBacks,http);
  }
  // Ajoutez cette méthode pour obtenir les statistiques des feedbacks
  getFeedbackStatistics(): Observable<{ pleasedCount: number; unpleasedCount: number }> {
    return this.https.get<{ pleasedCount: number; unpleasedCount: number }>(`${APIUrlFeedBacks}/feedbacks/statistics`);
  }
}
