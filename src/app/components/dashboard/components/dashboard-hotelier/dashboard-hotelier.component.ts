import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../../services/profile/profile.service";
import {CouponService} from "../../../../services/coupon/coupon.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard-hotelier',
  templateUrl: './dashboard-hotelier.component.html',
  styleUrls: ['./dashboard-hotelier.component.scss']
})
export class DashboardHotelierComponent implements OnInit {

  public userProfile:any = {};
  public title="";
  closeResult: string;
  aa:boolean=false;
  public my_coupons = [];

  constructor(private profileService: ProfileService, private couponService: CouponService,private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.profileService.getProfileMe().subscribe(data => {
      this.userProfile = data;
      this.couponService.getAllHotelierCoupons().subscribe(couponData => {
        this.my_coupons = couponData;
        console.log("my coupons hotelier" , this.my_coupons)
      });
      if(!this.userProfile.name){
        this.router.navigateByUrl("/login");
      }
    }, error => {
      this.router.navigateByUrl("/login");
    });
  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }

}
