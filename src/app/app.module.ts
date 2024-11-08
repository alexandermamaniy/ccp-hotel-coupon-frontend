import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from "./interceptors/authentication/authentication.interceptor";
import {ErrorInterceptor} from "./interceptors/error/error.interceptor";
import {BrowserModule} from "@angular/platform-browser";
import {DashboardModule} from "./components/dashboard/dashboard.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    DashboardModule
  ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
      },
      {
        provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
      }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
