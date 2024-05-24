import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenStorageService} from "./token.service";

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
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth,private tokenStorageService : TokenStorageService) {}

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
}
