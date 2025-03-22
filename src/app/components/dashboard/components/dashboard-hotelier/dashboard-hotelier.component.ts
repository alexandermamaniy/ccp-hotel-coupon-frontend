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
  public my_used_coupons = [];

  public alerts: Array<IAlert>=[];

  messageFromServer: any;
  wsSubscription: Subscription;
  status;

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);

      // // If you want to read the file:
      // const reader = new FileReader();
      // reader.onload = () => {
      //   console.log('File content:', reader.result);
      // };
      // reader.readAsText(this.selectedFile); // or readAsDataURL, etc.

      if (!this.selectedFile) {
        alert('Please select a file first.');
        return;
      }

      this.couponService.decodeQrCode(this.selectedFile).subscribe({
        next: response => {
          console.log('Decode success:', response);
          document.getElementById('coupon_id_input')['value'] = response.decoded_data

          this.clearFile(input);
        },
        error: error => {
          console.error('Decode failed:', error);
        }
      });
    }
  }

  clearFile(inputElement: HTMLInputElement): void {
    inputElement.value = ''; // Reset input
    this.selectedFile = null; // Clear file ref
  }

  constructor(private profileService: ProfileService,
              private couponService: CouponService,
              private router: Router,
              private modalService: NgbModal,
              private socketService: SocketService,
              private reportService: ReportService) { }

  ngOnInit() {
    this.profileService.getProfileMe().subscribe(data => {
      this.userProfile = data;

      this.subscribeWebSocket();

      this.couponService.getAllHotelierCoupons().subscribe(couponData => {
        this.my_coupons = couponData;
        console.log("my coupons hotelier" , this.my_coupons)
      });

      this.couponService.getAllUsedCoupons().subscribe(used_coupons => {
        this.my_used_coupons = used_coupons;
      })

      if(!this.userProfile.name){
        this.router.navigateByUrl("/login");
      }
    }, error => {
      this.router.navigateByUrl("/login");
    });
  }

  subscribeWebSocket(){
    this.wsSubscription = this.socketService.createObservableSocket("None", this.userProfile.id)
      .subscribe(
        data => {
          this.messageFromServer = JSON.parse(data);
          console.log("desde HOTELIER SOCKET ",this.messageFromServer);
          this.alerts.push({
            id: 1,
            type: 'success',
            message: this.messageFromServer.message,
            dismissible: true,
            state: true
          });

        },
        err => console.log('err'),
        () => console.log('The observable stream is complete')
      );
  }

  notifyAllUserSocket(coupon){
    // let body_message = {
    //   action: "notify-user",
    //   message: {
    //     coupon_name: coupon.title,
    //     hotel_name: this.userProfile.name,
    //     hotelier_id: this.userProfile.id
    //   }
    // }
    // this.sendMessageToServer(body_message);
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

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  sendMessageToServer(data){
    // const msg:{action: string, data: any}={action: 'sendMessage', 'data': 'Hello from UI'};
    this.status = this.socketService.sendMessage(JSON.stringify(data));
    if (!this.status) {
      console.log("Refreshing Web socket");
      this.subscribeWebSocket();
      this.sleep(500).then(() => {
        this.status = this.socketService.sendMessage(JSON.stringify(data));
      });

    }
  }

  useCoupon(){
    let code_code = document.getElementById('coupon_id_input')['value'].trim()
    this.couponService.useCoupon(code_code).subscribe(data => {
      console.log(data)
      this.my_used_coupons.push(data);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: "Coupon code: " +data.id + " has been used successfully",
        dismissible: true,
        state: true
      });
      document.getElementById('coupon_id_input')['value'] = "";
    }, error => {
      this.alerts.push({
        id: 1,
        type: 'danger',
        message: error.error,
        dismissible: true,
        state: true
      });
    })
  }

  closeSocket(){
    this.wsSubscription.unsubscribe();
    this.status = 'The socket is closed';
  }
  ngOnDestroy() {
    this.closeSocket();
  }

}
