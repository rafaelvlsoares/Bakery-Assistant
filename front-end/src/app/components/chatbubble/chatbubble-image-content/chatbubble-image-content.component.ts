import { Component, OnInit, Input } from '@angular/core';
import { ChatBubbleComponent } from '../chatbubble.component';
import { ChatBubbleImage } from '../chatbubble.model';

@Component({
  selector: 'app-chatbubble-image-content',
  templateUrl: './chatbubble-image-content.component.html',
  styleUrls: ['./chatbubble-image-content.component.css', '../chatbubble.component.css']
})
export class ChatbubbleImageContentComponent extends ChatBubbleComponent implements OnInit {

  @Input() public chatInfo: ChatBubbleImage;

  constructor() {
    super()
   }

  ngOnInit() {
  }

}
