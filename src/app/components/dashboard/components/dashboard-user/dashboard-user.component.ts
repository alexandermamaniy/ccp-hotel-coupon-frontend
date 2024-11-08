import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../../services/profile/profile.service";
import {Router} from "@angular/router";
import {CouponService} from "../../../../services/coupon/coupon.service";
import {IAlert} from "../../notification/notification.component";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  public userProfile:any = {};
  public title="";
  public alerts: Array<IAlert>=[];
  aa:boolean=false;
  public my_coupons = [];
  public all_coupons = [];
  constructor(private profileService: ProfileService, private couponService: CouponService,private router: Router, private modalService: NgbModal) { }


  setIndex(ii){
    this.aa=ii;
    console.log
  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }

  ngOnInit() {
    this.profileService.getProfileMe().subscribe(data => {
      this.userProfile = data;
        console.log("from user dashboard" , this.userProfile)
        this.couponService.getCouponsMe().subscribe(couponData => {
          this.my_coupons = couponData;
          console.log("my coupons" , this.my_coupons)
        });

        this.couponService.getAllCoupons().subscribe(allCouponData => {
          this.all_coupons = allCouponData;
          console.log("all coupons" , this.all_coupons)
        })

      if(!this.userProfile.full_name){
        this.router.navigateByUrl("/login");
      }

    }, error => {
      this.router.navigateByUrl("/login");
    });
  }

  redeemCoupon(id){
    this.couponService.redeemCoupon(id).subscribe(data => {
      this.my_coupons.push(data);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'The Coupon has been redeemed successfully!',
        dismissible: true,
        state: true
      })
    }, error => {
      this.alerts.push({
        id: 2,
        type: 'warning',
        message: `The coupon have been redeemed by yourself. You can't redeem twice!`,
        icon: 'nc-bell-55',
        dismissible: true,
        state: true
      })
    })
  }

}
