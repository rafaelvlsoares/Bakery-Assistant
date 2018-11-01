import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ChatBubble } from './chatbubble.model';
import { ModalComponent } from '../modal/modal.component';
import { ChatService } from '../../chat.service';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-chatbubble',
  templateUrl: './chatbubble.component.html',
  styleUrls: ['./chatbubble.component.css'],
  providers: [ModalComponent]
})
export class ChatBubbleComponent implements OnInit {

  @Input() public chatInfo: ChatBubble;

  constructor() {
  }

  ngOnInit() {
   }


}
