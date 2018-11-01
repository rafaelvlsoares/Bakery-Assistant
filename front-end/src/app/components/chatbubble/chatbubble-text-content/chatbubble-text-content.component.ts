import { Component, OnInit, Input } from '@angular/core';
import { ChatBubbleComponent } from '../chatbubble.component';
import { ChatBubbleText } from '../chatbubble.model';

@Component({
  selector: 'app-chatbubble-text-content',
  templateUrl: './chatbubble-text-content.component.html',
  styleUrls: ['chatbubble-text-content.component.css','../chatbubble.component.css']
})
export class ChatbubbleTextContentComponent extends ChatBubbleComponent implements OnInit {

  @Input() public chatInfo: ChatBubbleText;

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
