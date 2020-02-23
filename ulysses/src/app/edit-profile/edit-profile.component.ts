import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.models';
import { UserService} from '../services/user.service';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {

  userSubscription: Subscription;
  selectedFile: ImageSnippet;
  id: string;
  private user: User;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  info: string;
  private newUser: User = new User();
  newFirstName: string;
  newLastName: string;
  newEmail: string;
  newPhoneNumber: string;
  newInfo: string;



  // adding profile picture to user
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
    private Auth: AuthService
  ) { }

  getAndDisplayUser(): void {
    this.userService.getUser(this.id)
    .subscribe((user) => {
      this.user = user;
      if (!this.user.username){
        this.username = "";
      }else {
        this.username = this.user.username;
      }
      if (!this.user.firstName){
        this.firstName = "";
      }else {
        this.firstName = this.user.firstName;
      }
      if (!this.user.lastName){
        this.lastName = "";
      }else {
        this.lastName = this.user.lastName;
      }
      if (!this.user.fullName){
        this.fullName = "";
      }else {
        this.fullName = this.user.fullName;
      }
      if (!this.user.email){
        this.email = "";
      }else {
        this.email = this.user.email;
      }
      if (!this.user.phoneNumber){
        this.phoneNumber = "";
      } else {
        this.phoneNumber = this.user.phoneNumber;
      }
      if (!this.user.info){
        this.info = "";
      } else {
        this.info = this.user.info;
      }
    });
  }

  updateUser(event) {
    event.preventDefault();
    const target = event.target;
    this.newFirstName = target.querySelector('#defaultFormFirstName').value;
    console.log(this.newFirstName)
    this.newLastName = target.querySelector('#defaultFormLastName').value;
    this.newEmail = target.querySelector('#defaultFormEmail').value;
    this.newPhoneNumber = target.querySelector('#defaultPhoneNumber').value;
    this.newInfo = target.querySelector('#defaultInfo').value;
    this.newUser._id = this.id;
    this.newUser.firstName = this.newFirstName;
    this.newUser.lastName = this.newLastName;
    this.newUser.email = this.newEmail;
    this.newUser.phoneNumber = this.newPhoneNumber;
    this.newUser.info = this.newInfo;
    this.userService.updateUser(this.id, this.newUser)
    .subscribe(userDetails => {
      this.router.navigateByUrl('/profile/' + this.id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
    this.userSubscription = this.Auth.getUser().subscribe(user => {
      if (user && this.id === user._id) {
        this.user = user;
        this.getAndDisplayUser();
      } else {
        this.router.navigate(['/home/']);
      }
    });
  }

}
