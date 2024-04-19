import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Api url
const  APIUrl ="http://localhost:8081/api/v1/auth/";
@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient){}

  signIn(data :{email : string,password : string}): Observable<any>{
    return this.http.post(`${APIUrl}authenticate`, data)
  }
  signUp(data :any): Observable<any>{
    return this.http.post(`${APIUrl}register`, data)
  }

  signOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
