import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatBubble } from '../../chatbubble/chatbubble.model';
import { ChatService } from '../../../chat.service';

@Component({
  selector: 'app-chat-messages-holder',
  templateUrl: './chat-messages-holder.component.html',
  styleUrls: ['./chat-messages-holder.component.css']
})
export class ChatMessagesHolderComponent implements OnInit {

  subscription: Observable<Boolean>;

  @ViewChild('scrollMe') private myScrollElement: ElementRef;
  userTexts: Array<ChatBubble>;

  constructor(private chatService: ChatService) {
    this.userTexts = chatService.messages;
    this.chatService.bubbles.subscribe((res) => {
      if (res == 'Created') {
        //console.log("Created")
        setTimeout(() => {
          this.scrollToBottom()
        }, 100);
      }
    })
  }


  ngOnInit(){
  }

  scrollToBottom(): void {
    try {
      this.myScrollElement.nativeElement.scrollTop = this.myScrollElement.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
