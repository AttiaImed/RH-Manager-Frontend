import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  private statisticsSubject = new BehaviorSubject<{ pleasedCount: number, unpleasedCount: number }>({ pleasedCount: 0, unpleasedCount: 0 });
  statistics$ = this.statisticsSubject.asObservable();

  updateStatistics(data: { pleasedCount: number, unpleasedCount: number }) {
    this.statisticsSubject.next(data);
  }
}
