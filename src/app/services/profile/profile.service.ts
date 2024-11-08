import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  getProfileMe(): Observable<any>  {
    return this.http.get<any>(this.url +'profile/me');
  }

}
