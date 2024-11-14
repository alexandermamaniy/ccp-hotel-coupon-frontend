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

  closeResult: string;

  constructor(private modalService: NgbModal, private socketService: SocketService) {}


  ngOnInit() {

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
