import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardHotelierComponent } from './components/dashboard-hotelier/dashboard-hotelier.component';
import { RouterOutlet} from "@angular/router";
import {DashboardRoutingModule} from './dashboard-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {SearchPipe} from "./components/dashboard-user/search.pipe";
import {CouponDetailModalComponent} from "./components/coupon-detail-modal/coupon-detail-modal.component";
import {CouponCreateModalComponent} from "./components/coupon-create-modal/coupon-create-modal.component";
import {NotificationComponent} from "./notification/notification.component";
import {NgbdAlertBasic} from "./components/alert-basic/alert-basic";
import {SearchReportPipe} from "./components/dashboard-hotelier-report/search-report.pipe";
import { DashboardHotelierReportComponent } from './components/dashboard-hotelier-report/dashboard-hotelier-report.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardUserComponent,
    DashboardHotelierComponent,
    DashboardHotelierReportComponent,
    NavbarComponent,
    CouponDetailModalComponent,
    CouponCreateModalComponent,
    NotificationComponent,
    NgbdAlertBasic,
    SearchPipe,
    SearchReportPipe
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    NgbModule,
    NouisliderModule,
    TagInputModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    // NgxGalleryModule,
    // ImageUploadModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
