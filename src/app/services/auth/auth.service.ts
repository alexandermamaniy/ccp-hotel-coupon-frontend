import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

interface User {
  email: string;
  password: string;
}
interface TokenVerify{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url +"/api/";
  constructor( private http: HttpClient ) {

  }

  login(email: string, password:string): Observable<User>  {

    return this.http.post<User>(this.url+'token/', {email, password});
  }


  verify_token(token: string): Observable<any>  {
    return this.http.post<TokenVerify>(this.url+'token/verify/', {token});
  }

}
