import { Input,Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngbd-alert-basic',
  templateUrl: './alert-basic.html'
})
export class NgbdAlertBasic{

  @Input()
  staticAlertClosed:boolean;

  @Output()
  staticAlertClosedChange = new EventEmitter<boolean>()

  closeAlert(){
    this.staticAlertClosedChange.emit(true);
  }
}
