import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../../services/profile/profile.service";
import {Router} from "@angular/router";
import {CouponService} from "../../../../services/coupon/coupon.service";
import {IAlert} from "../../notification/notification.component";
import { Subscription } from 'rxjs';
import {SocketService} from "../../../../services/socket/socket.service";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit, OnDestroy {

  public userProfile:any = {};
  public title="";
  public alerts: Array<IAlert>=[];
  aa:boolean=false;
  public my_coupons = [];
  public all_coupons = [];


  messageFromServer: any;
  wsSubscription: Subscription;
  status;


  constructor(private profileService: ProfileService,
              private couponService: CouponService,
              private router: Router,
              private modalService: NgbModal,
              private socketService: SocketService) {}

  send_view_coupon_interaction_user(coupon){


    let date = new Date();
    let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


    let body_message = {
      action: "collect-user-interaction",
      message: {
        coupon_id: coupon.id,
        action: "view",
        user_profile_id: this.userProfile.id,
        country: "Ireland",
        date: dateString
      }
    }
    this.sendMessageToServer(body_message)
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  sendMessageToServer(data){
    // const msg:{action: string, data: any}={action: 'sendMessage', 'data': 'Hello from UI'};
    this.status = this.socketService.sendMessage(JSON.stringify(data));
    if (!this.status) {
      console.log("Refreshing Web socket");
      this.subscribeWebSocket();
      await this.sleep(500);
      this.status = this.socketService.sendMessage(JSON.stringify(data));

    }

  }

  closeSocket(){
    this.wsSubscription.unsubscribe();
    this.status = 'The socket is closed';
  }


  setIndex(ii){
    this.aa=ii;
    console.log
  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }

  subscribeWebSocket(){
    this.wsSubscription = this.socketService.createObservableSocket(this.userProfile.id, "None")
      .subscribe(
        data => {
          console.log("Daata del server socker", data)
          this.messageFromServer = JSON.parse(data);
          console.log("desde socket ",this.messageFromServer);
          this.alerts.push({
            id: 1,
            type: 'info',
            message: this.messageFromServer.message,
            dismissible: true,
            state: true
          })
          this.couponService.getCouponsMe().subscribe(couponData => {
            this.my_coupons = couponData;
          });

          this.couponService.getAllCoupons().subscribe(allCouponData => {
            this.all_coupons = allCouponData;
          })
        },
        err => console.log('err'),
        () => console.log('The observable stream is complete')
      );
  }

  ngOnInit() {
    this.profileService.getProfileMe().subscribe(data => {
      this.userProfile = data;
      this.subscribeWebSocket();

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

  // Update with tabla intermedia
  redeemCoupon(id){
    this.couponService.redeemCoupon(id).subscribe(data => {
      this.my_coupons.push(data);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'The Coupon has been redeemed successfully!',
        dismissible: true,
        state: true
      });
      let date = new Date();
      let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      let body_message = {
        action: "collect-user-interaction",
        message: {
          coupon_id: id,
          action: "redeem",
          user_profile_id: this.userProfile.id,
          country: "Ireland",
          date: dateString
        }
      }
      this.sendMessageToServer(body_message)
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

  ngOnDestroy() {
    this.closeSocket();
  }

}
