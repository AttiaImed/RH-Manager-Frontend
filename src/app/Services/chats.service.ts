// src/app/chat.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenStorageService} from "./token.service";

interface Message {
  from: string;
  to : string;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth,private tokenStorage : TokenStorageService) {

  }

  getMessages(): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(text: string,username : string): void {
    this.auth.user.subscribe(user => {
      const message: Message = {
        from: username,
        text: text,
        to : "2",
        timestamp: Date.now()
      };
      this.firestore.collection('messages').add(message);
    });
  }
}
