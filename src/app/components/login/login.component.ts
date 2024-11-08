import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data : Date = new Date();
  form: FormGroup;

  constructor( private  fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  private setSession(data) {
    localStorage.setItem('id_token', data.access);
  }

  login(){
    const  val = this.form.value;
    if(val.email && val.password ){
      this.authService.login(val.email, val.password)
        .subscribe( (data) => {
            console.log("User is logged in", data);
            this.setSession(data);
          this.form.reset();
            this.router.navigateByUrl("/dashboard");

          }, error => {
            this.form.reset();
            this.router.navigateByUrl("/login");
          }
        );
    }
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
  }

}
