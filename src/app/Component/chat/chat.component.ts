import { Component, ElementRef, Input, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DatePipe, NgForOf } from "@angular/common";
import { ChatsService } from "../../Services/chats.service";
import { TokenStorageService } from "../../Services/token.service";
import { UserService } from "../../Services/user.service";
import { Utilisateur } from "../../Models/utilisateur";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  messages: any[] = [];
  text: string = '';
  @Input() isVisible: boolean = true;
  @ViewChild('messagesArea') private messagesArea!: ElementRef;
  user!: Utilisateur;

  constructor(
    private chatService: ChatsService,
    private tokenService: TokenStorageService,
    private userService: UserService
  ) {
    const userId = this.tokenService.getUser();
    this.userService.get(userId).subscribe((res: Utilisateur) => {
      this.user = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.text.trim().length > 0) {
      this.chatService.sendMessage(this.text, this.user.prenom + this.user.nom);
      this.text = '';
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
    } catch (err) { }
  }

  closeChat(): void {
    this.isVisible = false;
  }
}
