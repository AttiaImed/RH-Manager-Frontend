import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

//Api url
const  APIUrl ="http://localhost:8081/api/v1/auth/";
@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient,private route :Router){}

  signIn(data :{email : string,password : string}): Observable<any>{
    return this.http.post(`${APIUrl}authenticate`, data)
  }
  signUp(data :any): Observable<any>{
    return this.http.post(`${APIUrl}register`, data)
  }

  signOut(): void {
    window.sessionStorage.clear();
    console.log(window.sessionStorage)
    this.route.navigate(['/login'])
  }
getUserId(){
    const token : any = window.sessionStorage.getItem('auth-token');
    const decodedToken : any = jwt_decode.jwtDecode(token)
  return decodedToken?.user_id
}

}
