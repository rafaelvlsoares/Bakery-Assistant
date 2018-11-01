import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer-button-text',
  templateUrl: './footer-button-text.component.html',
  styleUrls: ['./footer-button-text.component.css']
})
export class FooterButtonTextComponent implements OnInit {
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  onSubmit(e) {
   this.submitEvent.emit(e)
  }
}
