import {Component, Input, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {SocketService} from "../../../../services/socket/socket.service";

@Component({
  selector: 'app-coupon-detail-modal',
  templateUrl: './coupon-detail-modal.component.html',
  styleUrls: ['./coupon-detail-modal.component.scss']
})
export class CouponDetailModalComponent implements OnInit {

  @Input() couponTarget;
  @Input() is_hotelier: boolean;

  closeResult: string;

  constructor(private modalService: NgbModal, private socketService: SocketService) {}


  ngOnInit() {

  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }
  open(content, type) {



    if (type === 'sm') {
      console.log('aici');
      this.modalService.open(content, { size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
