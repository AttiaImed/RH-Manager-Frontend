import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
const  APIUrlUser ="http://localhost:8081/api/Utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService{

  constructor(http:HttpClient,private httpPrivate: HttpClient) {
    super(APIUrlUser,http,);
  }
  getFile(userId: number): Observable<any> {
    return this.httpPrivate.get(`${APIUrlUser}/downloadFile/${userId}`, { responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          // Handle the specific error code
          console.log('File not found');
        } else {
          // Handle other error codes or general error
          console.error('An error occurred:', error.message);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  // upload Image Profile For user
  uploadImage(id : number,uploadedImage : any){
    return this.httpPrivate.post(`${APIUrlUser}/uploadFile/${id}`,uploadedImage);
  }
}
