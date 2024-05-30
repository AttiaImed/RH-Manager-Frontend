import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenStorageService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {A} from "@angular/cdk/keycodes";
const  APIUrlUser ="http://localhost:8081/api/chat/";

interface Message {
  from: number;
  to: number;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  constructor(private http: HttpClient,
  private firestore: AngularFirestore, private auth: AngularFireAuth,private tokenStorageService : TokenStorageService) {}

  getMessages(): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(text: string, to: number): void {
    const currentUserId = this.tokenStorageService.getUser() as number;
    console.log(currentUserId)
    this.auth.user.subscribe(user => {
      const message: Message = {
        from: Number(currentUserId),
        to: to,
        text: text,
        timestamp: Date.now()
      };
      this.firestore.collection('messages').add(message);
    });
  }
  getMessagesWithSenderAndReciever(senderId:any,recieverId:any){
    return this.http.get(`${APIUrlUser}messages?senderId=${senderId}&receiverId=${recieverId}`)
  }
  sendMessagesWithSenderAndReciever(body:any){
    return this.http.post(`${APIUrlUser}send-message`,body)
  }

}
