import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardUserComponent} from './components/dashboard-user/dashboard-user.component';
import {DashboardHotelierComponent} from './components/dashboard-hotelier/dashboard-hotelier.component';

const routes: Routes = [
  { path: 'user', component:  DashboardUserComponent},
  { path: 'hotelier', component: DashboardHotelierComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}

