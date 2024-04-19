import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../Models/conge';  
@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:8099/api/conges';

  constructor(private http: HttpClient) { }
  
  getConge(id: number): Observable<Conge> {
    return this.http.get<Conge>(`${this.baseUrl}/${id}`);
  }

  createConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.baseUrl, conge);
  }

  updateConge(id: number, conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.baseUrl}/${id}`, conge);
  }

  deleteConge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCongesList(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.baseUrl);
  }

}
