import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


interface UserData {
  full_name: string;
  user: {
    email: string;
  }
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() userProfile: any;

  constructor( private router: Router) {}
  logout() {
    localStorage.removeItem("id_token");
    this.router.navigateByUrl("/login");
  }
}
