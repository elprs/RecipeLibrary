import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector : 'app-alert',
  templateUrl : './alert.component.html',
  styleUrls: ['./alert.component.css']
})
  export class AlertComponent {
    @Input() message :string; // to make this settable from outside.'
    @Output()  close  = new EventEmitter();

    onClose(){
      this.close.emit(null);
    }
  }
