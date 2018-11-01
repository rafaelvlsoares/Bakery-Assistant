import { Component, OnInit, Input } from '@angular/core';
import { ChatBubbleComponent } from '../chatbubble.component';
import { ChatBubbleLoading } from '../chatbubble.model';

@Component({
  selector: 'app-chatbubble-loading-content',
  templateUrl: './chatbubble-loading-content.component.html',
  styleUrls: ['./chatbubble-loading-content.component.css', '../chatbubble.component.css']
})
export class ChatbubbleLoadingContentComponent extends ChatBubbleComponent implements OnInit  {

  @Input() public chatInfo: ChatBubbleLoading;

  constructor() { 
    super()
  }
  ngOnInit() {
  }

}
