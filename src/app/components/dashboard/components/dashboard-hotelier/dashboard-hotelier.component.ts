import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../../../../services/profile/profile.service";
import {CouponService} from "../../../../services/coupon/coupon.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SocketService} from "../../../../services/socket/socket.service";
import {Subscription} from "rxjs";
import {IAlert} from "../../notification/notification.component";
import {ReportService} from "../../../../services/report/report.service";

@Component({
  selector: 'app-dashboard-hotelier',
  templateUrl: './dashboard-hotelier.component.html',
  styleUrls: ['./dashboard-hotelier.component.scss']
})
export class DashboardHotelierComponent implements OnInit, OnDestroy {

  public userProfile:any = {};
  public title="";
  public created_date="";
  closeResult: string;
  aa:boolean=false;
  public my_coupons = [];

  public my_reports = []

  public alerts: Array<IAlert>=[];

  messageFromServer: any;
  wsSubscription: Subscription;
  status;



  constructor(private profileService: ProfileService,
              private couponService: CouponService,
              private router: Router,
              private modalService: NgbModal,
              private socketService: SocketService,
              private reportService: ReportService) { }

  ngOnInit() {
    this.profileService.getProfileMe().subscribe(data => {
      this.userProfile = data;

      this.socketService.createObservableSocket("None", this.userProfile.id)
        .subscribe(
          data => {
            console.log("Daata del server socker", data)
            this.messageFromServer = JSON.parse(data);
            console.log("desde socket ",this.messageFromServer);
            this.alerts.push({
              id: 1,
              type: 'success',
              message: this.messageFromServer.message,
              dismissible: true,
              state: true
            });
            this.reportService.getAllHotelierReport().subscribe(reports => {
              console.log("reports", reports);
              this.my_reports = reports;
            });

          },
          err => console.log('err'),
          () => console.log('The observable stream is complete')
        );
      this.couponService.getAllHotelierCoupons().subscribe(couponData => {
        this.my_coupons = couponData;
        console.log("my coupons hotelier" , this.my_coupons)
      });

      this.reportService.getAllHotelierReport().subscribe(reports => {
        console.log("reports", reports);
        this.my_reports = reports;
      });

      if(!this.userProfile.name){
        this.router.navigateByUrl("/login");
      }
    }, error => {
      this.router.navigateByUrl("/login");
    });
  }

  getReport(){
    this.reportService.getHotelierReport().subscribe(data => {
        console.log(data);
    });
    this.alerts.push({
      id: 1,
      type: 'info',
      message: " We are generating your report, we let you know when it is ready",
      dismissible: true,
      state: true
    })
  }

  notifyAllUserSocket(coupon){
    let body_message = {
      action: "notify-user",
      message: {
        coupon_name: coupon.title,
        hotel_name: this.userProfile.name,
        hotelier_id: this.userProfile.id
      }
    }
    this.sendMessageToServer(body_message);
    this.alerts.push({
      id: 1,
      type: 'success',
      message: coupon.title+" has just released successfully",
      dismissible: true,
      state: true
    })
  }
  getDate(created_date){
    return new Date(created_date).toDateString()
  }

  sendMessageToServer(data){
    // const msg:{action: string, data: any}={action: 'sendMessage', 'data': 'Hello from UI'};
    this.status = this.socketService.sendMessage(JSON.stringify(data));
    console.log(this.status);
  }


  closeSocket(){
    this.wsSubscription.unsubscribe();
    this.status = 'The socket is closed';
  }
  ngOnDestroy() {
    this.closeSocket();
  }

}
