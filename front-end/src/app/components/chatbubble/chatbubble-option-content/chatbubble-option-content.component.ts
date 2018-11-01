import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../chat.service';
import { ChatBubbleComponent } from '../chatbubble.component';
import { ChatBubbleOption } from '../chatbubble.model';

@Component({
  selector: 'app-chatbubble-option-content',
  templateUrl: './chatbubble-option-content.component.html',
  styleUrls: ['./chatbubble-option-content.component.css','../chatbubble.component.css']
})
export class ChatbubbleOptionContentComponent extends ChatBubbleComponent {

  @Input() public chatInfo: ChatBubbleOption;

  protected disabled:boolean = true
  constructor(private chatService:ChatService) {super() 
  let observable = this.chatService.bubbles.subscribe((res)=>{
    if(res == 'Finished'){
      this.disabled = false;
      observable.unsubscribe()
    }
  })
  }
  sendToWatson(option){
    if(!this.disabled){
      this.chatService.sendToWatson(option.label)
      this.disabled = true
    }
  }
}
