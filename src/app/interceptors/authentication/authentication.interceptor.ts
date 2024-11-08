import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;
  constructor() {
    this.urlsToNotUse= [
      'token/',
    ];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem("id_token");
    // console.log("Request intial" , request);
    // if (this.isValidRequestForInterceptor(request.url) && authToken) {
    //   console.log("Se agregara HEADER AUTH");
    //   const authReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${authToken}`
    //     }
    //   });
    //
    //   return next.handle(authReq);
    // }
    if (authToken) {
      console.log("Se agregara HEADER AUTH");
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

    console.log("Peticion Saliendo");
    // If there is no token, pass the original request
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
