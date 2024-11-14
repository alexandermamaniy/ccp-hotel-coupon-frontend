import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  getHotelierReport(): Observable<any>  {

    return this.http.get<any>(this.url +'report/generate-pdf');
  }

  getAllHotelierReport(): Observable<any>  {
    return this.http.get<any>(this.url +'report/me');
  }
}
