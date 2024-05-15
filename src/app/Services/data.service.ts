import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppError } from './Commun/app-error';
import { BadInput } from './Commun/bad-input-error';
import { NotFoundError } from './Commun/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Inject ApiUrl in constructor to Get it form ather Service
  constructor(@Inject(String) private APIUrl: string, private http: HttpClient) {
  }

  // Get Method
  getAll(): Observable<any> {
    return this.http.get<any>(this.APIUrl);
  }

  // Get Method
  getAllWithpage(page: number, limit: number, search: string = ""): Observable<any> {
    return this.http.get<any>(this.APIUrl + "?page=" + page + "&limit=" + limit + "&search=" + search);
  }

  //get with id
  get(id: any): Observable<any> {
    return this.http.get(`${this.APIUrl}/${id}`);
  }

  // Update Method
  Update(id: any, data: any): Observable<any> {
    return id != null ? this.http.put(`${this.APIUrl}/${id}`, data) : this.http.put(this.APIUrl, data);
  }

  //Create Method
  Create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(this.APIUrl, data);
  }

  //Delete Method
  Delete(id: any): Observable<any> {
    return this.http.delete(`${this.APIUrl}/${id}`);
  }
  Authenticate(credentiels: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/authenticate`,credentiels);
  }
  Register(body:any): Observable<any>{
    return this.http.post(`${this.APIUrl}/register`,body)
  }
  getUserDetails(id:string){
    return this.http.get<any>(`http://localhost:8081/api/Utilisateur/${id}`)
  }
  saveUserDetails(id:string,body:any){
    return this.http.put<any>(`http://localhost:8081/api/Utilisateur/${id}`,body)
  }
}
