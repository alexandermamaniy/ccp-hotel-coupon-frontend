import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardUserComponent} from './components/dashboard-user/dashboard-user.component';
import {DashboardHotelierComponent} from './components/dashboard-hotelier/dashboard-hotelier.component';
import {DashboardHotelierReportComponent} from "./components/dashboard-hotelier-report/dashboard-hotelier-report.component";

const routes: Routes = [
  { path: 'user', component:  DashboardUserComponent},
  { path: 'hotelier', component: DashboardHotelierComponent },
  { path: 'hotelier-report', component: DashboardHotelierReportComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}

