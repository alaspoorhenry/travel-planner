import { Component, OnInit } from '@angular/core';
import { Itinerary } from '../services/itinerary.models';
import { ItineraryService} from '../services/itinerary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  title = 'Ulysses';
  authorized = false;
  displayItineraries: Itinerary[] = [];
  currentPage: number;

  viewItinerary(itinerary: Itinerary) {
    if (itinerary && itinerary._id) {
      this.router.navigate(['/plan/' + itinerary._id]);
    }
  }

  getAndDisplayPage(page: number): void {
    this.itineraryService.getItineraries(page)
    .subscribe((itineraries) => {
      if (itineraries) {
        this.currentPage = page; // Update current page
        this.displayItineraries = [];
        for (let i = 0; i < itineraries.length; i++) {
          this.displayItineraries.push(itineraries[i]);
          if (itineraries[i].locations[0]) {
            itineraries[i].photoUrl = itineraries[i].locations[0].photoUrl;
          } else {
            itineraries[i].photoUrl = '/assets/images/default-itinerary.png'
          }
        }
      } else {
        //Handle error
      }
    });
  }

  pageLeft(): void {
    if (this.currentPage > 0) {
      this.getAndDisplayPage(this.currentPage - 1);
    }
  }

  pageRight(): void {
    this.getAndDisplayPage(this.currentPage + 1);
  }

  constructor(private itineraryService: ItineraryService, private router: Router) {
    this.currentPage = 0;

  }

  ngOnInit() {
  this.getAndDisplayPage(this.currentPage);
  }

}
