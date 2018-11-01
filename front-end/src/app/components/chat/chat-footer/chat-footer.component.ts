import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../../../chat.service';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css']
})
export class ChatFooterComponent implements OnInit {
  @ViewChild('userinput') private inputElement: ElementRef;
  @Output() scrollToBottom: EventEmitter<any> = new EventEmitter()
  inputText: string;
  subscription: any;
  loading: boolean;

  constructor(private chatService: ChatService) {
    this.chatService.bubbles.subscribe((res) => {
      if (res == 'Finished') {
        this.loading = false;
        setTimeout(() => {
          this.inputElement.nativeElement.focus();
        }, 100);
      }
    })
  }

  ngOnInit() {
    this.inputElement.nativeElement.focus();
  }
  
  onSubmit(e) {
    e.preventDefault();
    if (this.inputText && this.inputText.trim() != "") {
      this.loading = true
      this.chatService.sendToWatson(this.inputText)
    }
    this.inputText = '';
  }
}
