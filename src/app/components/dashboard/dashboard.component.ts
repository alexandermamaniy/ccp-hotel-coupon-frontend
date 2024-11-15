import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  userProfile:any ={};
  isHotelier:boolean =false;
  constructor(private profileService: ProfileService,  private router: Router) {
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-defaul");
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");

    this.profileService.getProfileMe().subscribe((data) => {
      console.log("from Dashboard", data)
      this.userProfile = data;
      if (this.userProfile.name) {
        this.isHotelier =  true;
      }



      if (!this.isHotelier) {
        this.router.navigateByUrl("/dashboard/user");
      } else {
        this.router.navigateByUrl("/dashboard/hotelier");
      }
    }, (error) => {
      console.error(error);
      this.router.navigateByUrl("/login");
    });
  }
}
