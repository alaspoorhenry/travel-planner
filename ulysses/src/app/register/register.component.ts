import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent implements OnInit {

  registerDetails = {username: "", password: ""};

  constructor(private router: Router, private Auth: AuthService) { }

  ngOnInit() {
  }

  registerUser(event){
    event.preventDefault();
    const target = event.target;
    this.registerDetails.username = target.querySelector('#username').value;
    this.registerDetails.password = target.querySelector('#password').value;
    this.Auth.registerUser(this.registerDetails).subscribe(
      userDetails => {
        if (userDetails) {
          console.log(userDetails);
          this.router.navigateByUrl("/login");  
        }
      }
    );
    target.querySelector('#username').value = "";
    target.querySelector('#password').value = "";
  }
}
