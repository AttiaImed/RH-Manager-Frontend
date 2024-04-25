import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CalendarService{
  private baseUrl = 'http://localhost:8081/api/calendar-events';

  constructor(private http: HttpClient) { }


  getCalendarEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }
}