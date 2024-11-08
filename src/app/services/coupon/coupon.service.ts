import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

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


}
