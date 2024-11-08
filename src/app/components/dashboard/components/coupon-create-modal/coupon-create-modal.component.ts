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
      media_url: ["", Validators.required],
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

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createCouponform.get('media_url').setValue(file);
    }
  }

  createCoupon() {


    // this.createCouponform.value.expiration_date = this.dateToYMD(this.createCouponform.value.expiration_date)

    console.log(this.createCouponform.value)

    const formData = new FormData();

    formData.append('title', this.createCouponform.get('title').value);
    formData.append('description', this.createCouponform.get('description').value);
    formData.append('discount', this.createCouponform.get('discount').value);
    formData.append('media_url', this.createCouponform.get('media_url').value);
    formData.append('quantity', this.createCouponform.value.quantity);
    formData.append('expiration_date', this.dateToYMD(this.createCouponform.get('expiration_date').value));

    console.log(formData)

    this.couponService.createCoupon(formData).subscribe(data=> {
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
