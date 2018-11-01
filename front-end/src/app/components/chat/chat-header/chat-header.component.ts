import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {
  public showImage:boolean
  constructor() { 
    if (window.screen.width > 600 && window.screen.width < 730) {
      this.showImage = false;
    }else{
      this.showImage = true;
    }
  }

  ngOnInit() {

  }

  onResize(e) {
    if (e.target.innerWidth > 600 && e.target.innerWidth < 730) {
      this.showImage = false;
    } else {
      this.showImage = true;
    }
  }

}
