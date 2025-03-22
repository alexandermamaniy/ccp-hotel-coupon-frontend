import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
  url = environment.url +"/api/";
  url_qr = environment.qr_code_service_host;
  constructor( private http: HttpClient ) {

  }
  // replace with coupon_user
  getCouponsMe(): Observable<any>  {
    return this.http.get<any>(this.url +'coupon/me');
  }

  getAllCoupons(): Observable<any>  {
    return this.http.get<any>(this.url +'coupon');
  }

  getAllHotelierCoupons(): Observable<any>  {
    return this.http.get<any>(this.url +'coupon/hotelier');
  }

  createCoupon(data): Observable<any>{
    return this.http.post(this.url+'coupon/create-hotelier', data);
  }

  redeemCoupon(id): Observable<any>{
    return this.http.get(this.url+'coupon/redeem/'+ id);
  }

  useCoupon(id): Observable<any>{
    return this.http.get(this.url+'coupon/use/'+ id);
  }


  getAllUsedCoupons(): Observable<any>{
    return this.http.get(this.url+'coupon/list-used');
  }

  getQRCode(id): Observable<any>  {
    return this.http.get<any>(this.url_qr +'qr_code?id='+id);
  }

  decodeQrCode(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.url_qr +'qr_code', formData);
  }
}
