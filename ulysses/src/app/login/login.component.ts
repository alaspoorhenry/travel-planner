import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  authorized = false;

  constructor(
      private Auth: AuthService,
      private router: Router) { }

  loginUserData = {username: "", password: ""};

  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.loginUserData.username = username;
    this.loginUserData.password = password;
    this.Auth.loginUser(this.loginUserData)
      .subscribe(userDetails => {
        if (userDetails){
          console.log(userDetails);
          this.router.navigateByUrl('/home');  
        }
      });
    target.querySelector("#username").value = "";
    target.querySelector("#password").value = "";
  }

  directToReg(event){
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  
  }

}
