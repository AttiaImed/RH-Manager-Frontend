import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../Models/conge';
import {ApprovalStatus} from "../Models/approval-status.enum";
@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:8081/api/conges';

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
  getCasualLeaveCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/casual-leave-count`);
  }

  getSickLeaveCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sick-leave-count`);
  }

  getPersonalDaysCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/personal-days-count`);
  }

  updateApprovalStatus(id: number, status: ApprovalStatus): Observable<Conge> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(status);
    return this.http.put<Conge>(`${this.baseUrl}/${id}/approval`, body, { headers });
  }

}
