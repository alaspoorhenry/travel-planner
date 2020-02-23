import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {
  user?: string;
  id?: string;
  userAvatar?: string;
  userSubscription: Subscription;

  constructor(
    private Auth: AuthService,
    private router: Router
  ) { }

  logout(event) {
    event.preventDefault();
    this.Auth.logout()
    .subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

  ngOnInit() {
    // Random an avatar for now
    let num =  Math.floor(Math.random() * 9) + 1 ;
    this.userAvatar = '/assets/images/user-icons/' + num + '.svg';
    this.userSubscription = this.Auth.getUser().subscribe(user => {
      if (user) {
        this.user = user.user;
        this.id = user._id;
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSubscription.unsubscribe();
  }

}
