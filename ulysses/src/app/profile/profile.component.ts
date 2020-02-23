import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.models';
import { UserService} from '../services/user.service';
import { Itinerary } from '../services/itinerary.models';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ItineraryService } from '../services/itinerary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  id: string;
  user: User;
  loggedInUser: User;
  userSubscription: Subscription;

  userItineraries: Itinerary[] = [];

  getAndDisplayUserItineraries(): void {
    this.itineraryService.getUserItineraries(this.user._id)
    .subscribe((itineraries) => {
      if (itineraries) {
        this.userItineraries = [];
        for (let i = 0; i < itineraries.length; i++) {
          this.userItineraries.push(itineraries[i]);
          if (itineraries[i].locations[0]) {
            itineraries[i].photoUrl = itineraries[i].locations[0].photoUrl;
          }
        }
      } else {
        //Handle error
      }
    });
  }

  addNewItinerary(): void {
    this.itineraryService.addNewItinerary().subscribe((itinerary) => {
      if (itinerary && itinerary._id) {
        this.router.navigate(['/plan/' + itinerary._id]);
      }
    });
  }

  viewItinerary(itinerary: Itinerary) {
    if (itinerary && itinerary._id) {
      this.router.navigate(['/plan/' + itinerary._id]);
    }
  }


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private Auth: AuthService,
    private itineraryService: ItineraryService,
  ) { }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.userService.getUser(this.id)
    .subscribe((user) => {
      if (user) {
        this.user = user;
        this.getAndDisplayUserItineraries();
      } else {
        this.router.navigateByUrl('/404/', { skipLocationChange: true });
      }

    });

    this.userSubscription = this.Auth.getUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }

}
