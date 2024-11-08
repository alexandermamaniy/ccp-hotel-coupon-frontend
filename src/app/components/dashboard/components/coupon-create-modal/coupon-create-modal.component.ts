import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CouponService} from "../../../../services/coupon/coupon.service";

@Component({
  selector: 'app-coupon-create-modal',
  templateUrl: './coupon-create-modal.component.html',
  styleUrls: ['./coupon-create-modal.component.scss']
})
export class CouponCreateModalComponent {
  closeResult: string;
  date: {year: number, month: number};
  createCouponform: FormGroup;
  constructor(private modalService: NgbModal, private  fb: FormBuilder, private router:Router, private couponService: CouponService) {
    this.createCouponform = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      discount: ["", Validators.required],
      // media_url: ["", Validators.required],
      quantity: ["", Validators.required],
      expiration_date: ["", Validators.required]
    })
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

   dateToYMD(date_format) {
    let date = new Date(date_format)
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  createCoupon() {
    console.log("out form",this.createCouponform.value);
    this.createCouponform.value.expiration_date = this.dateToYMD(this.createCouponform.value.expiration_date)
    console.log("out form",this.createCouponform.value);
    this.couponService.createCoupon(this.createCouponform.value).subscribe(data=> {
      console.log("response from server", data);
      this.createCouponform.reset();
      this.modalService.dismissAll();
      this.reloadCurrentRoute()
    }, error => {
      console.log(error)
    })
  }


  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
