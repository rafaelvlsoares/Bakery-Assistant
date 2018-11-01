import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideToMobile: boolean;

  constructor() {
    if (window.screen.width <= 600) {
      this.hideToMobile = true;
    }
  }

  onResize(e) {
    if (e.target.innerWidth > 600) {
      this.hideToMobile = false;
    } else {
      this.hideToMobile = true;
    }
  }
}
