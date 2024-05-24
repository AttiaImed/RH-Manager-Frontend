import { Component, ElementRef, Input, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { ChatsService } from "../../Services/chats.service";
import { TokenStorageService } from "../../Services/token.service";
import { UserService } from "../../Services/user.service";
import { Utilisateur } from "../../Models/utilisateur";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    MatGridList,
    MatGridTile,
    NgClass,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  messages: any[] = [];
  contacts: any[] = [];
  text: string = '';
  isVisible: boolean = true;
  @ViewChild('messagesArea') private messagesArea!: ElementRef;
  user!: Utilisateur;
  selectedContact : number = 0;

  constructor(
    private chatService: ChatsService,
    private tokenService: TokenStorageService,
    private userService: UserService
  ) {
    const userId = this.tokenService.getUser();
    this.userService.get(userId).subscribe((res: Utilisateur) => {
      this.user = res;
      this.loadContacts();
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages.filter((message: any) => message.from === this.user.id || message.to === this.user.id);
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.text.trim().length > 0) {
      this.chatService.sendMessage(this.text, this.selectedContact);
      this.text = '';
    }
  }

  private loadContacts(): void {
    this.chatService.getMessages().subscribe(messages => {
      // Extract unique user IDs from the messages
      const userIds = Array.from(new Set(
        messages.flatMap(message => [message.from, message.to])
      )).filter(id => id !== this.user.id);
      console.log(userIds)
      // Fetch user details for these IDs
      this.userService.getAll().subscribe(allUsers => {
        this.contacts = allUsers.filter((user:any) => userIds.includes(user.id));
        this.selectedContact = userIds[0];
        console.log(this.selectedContact )
      });
    });
  }


  private scrollToBottom(): void {
    try {
      this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
    } catch (err) { }
  }

  closeChat(): void {
    this.isVisible = false;
  }
  toggleChat(): void {
    this.isVisible = !this.isVisible;
  }
}
