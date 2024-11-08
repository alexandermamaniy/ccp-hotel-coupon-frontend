import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes =[
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  { path: 'login', component: LoginComponent },
  {
    path:'dashboard',
    component:DashboardComponent,
    loadChildren:() =>import('./components/dashboard/dashboard.module').then(x=>x.DashboardModule)
  },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
          useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
