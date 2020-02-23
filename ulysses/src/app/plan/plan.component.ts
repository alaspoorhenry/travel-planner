import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MarkerObject } from './plan.models';
import { ChangeDetectorRef } from '@angular/core';
import { ItineraryService} from '../services/itinerary.service';
import { AuthService} from '../services/auth.service';
import { Itinerary, Place } from '../services/itinerary.models';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../services/user.models';

declare var google;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.less']
})

export class PlanComponent implements OnInit {

  // Map set up
  map: any;
  placesService: any;
  zoom: number;
  lat: number;
  lng: number;

  // Display and view set up
  mode: {plan: boolean} = {plan: false};
  id: string;
  itineraryName: string = 'My Itinerary';
  search: string;
  markersArray: MarkerObject[];
  nearbyPlacesResults: {}[];
  tempMarker: MarkerObject;
  itineraryArray: Place[];
  serverItinerary: Itinerary; // Caching
  formattedAddress = "";

  // Authorization
  loggedInUser: User;
  userSubscription: Subscription;

  options = {
    componentRestrictions : {
      country: ['CA']
    }
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
  }

  addMarker(place: Place): void {
    let marker: MarkerObject = {label: this.markersArray.length + 1 + '',
    latitude: place.geometry.lat,
    longitude: place.geometry.lng,
    id: place.id };
    this.markersArray.push(marker);
  }

  removeMarker(id: string): void {
    this.markersArray.forEach((marker, index) => {
      if (marker.id === id) {
        this.markersArray.splice(index, 1);
        return;
      }
    });
  }

  addTempMarker(place: any): void {
    if (place.geometry.location.lat && place.geometry.location.lng && place.id) {
      this.tempMarker = {label: undefined,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        id: place.id
      };
      this.chRef.detectChanges();
    }
  }

  removeTempMarker(): void {
    this.tempMarker = null;
    this.chRef.detectChanges();
  }

  addToItinerary(place: any): void {
    let geometry = {lat: <number>place.geometry.location.lat(), lng: <number>place.geometry.location.lng()};
    let formattedPlace: Place = {geometry: geometry, name: place.name, id: place.id, photoUrl: place.photoUrl,
      rating: place.rating, types: place.types, address: place.vicinity, totalUserRatings: place.user_ratings_total, compoundCode: place.plus_code.compoundCode};
    this.itineraryArray.push(formattedPlace);
    this.addMarker(formattedPlace);
  }

  removeFromItinerary(index: number): void {
    let removed = this.itineraryArray.splice(index, 1);
    this.removeMarker(removed[0].id);
  }

  searchNearbyPlaces(value: string): void {
    let request = {
      name: value,
      location: this.map.getCenter(),
      radius: '2000',
      type: ['']
    };
    this.placesService.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.nearbyPlacesResults = [];
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          console.log(place);
          if (!place.photos) {
            place.photos = [];
            place.photoUrl = null;
          } else {
            place.photoUrl = place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 300});
          }
          this.nearbyPlacesResults.push(place);
        }
      } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.nearbyPlacesResults = [];
      }
      this.chRef.detectChanges();
    });
  }

  enterPlanMode(): void {
    this.mode.plan = true;
  }

  saveItinerary(): void {
    this.saveItineraryLocations();
    this.saveItineraryName();
    this.mode.plan = false;
  }

  saveItineraryLocations(): void {
    // TODO: User caching to prevent unneeded api calls
    this.itineraryService.updateItinerary(this.serverItinerary._id, 'locations', this.itineraryArray)
    .subscribe(itinerary => {
      console.log(itinerary);
      if (itinerary) {
        this.serverItinerary = itinerary;
        this.itineraryName = itinerary.name;
      } else {
        console.log('save error');
      }
    });
  }

  saveItineraryName(): void {
    this.itineraryService.updateItinerary(this.serverItinerary._id, 'name', this.itineraryName)
    .subscribe(itinerary => {
      console.log(itinerary)
      if (itinerary) {
        this.serverItinerary = itinerary;
        this.itineraryName = itinerary.name;
      } else {
        console.log('save error');
      }
    });
  }

  mapReady(map: any): void {
    this.map = map;
    this.placesService = new google.maps.places.PlacesService(map);
  }

  constructor(
    private chRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private itineraryService: ItineraryService,
    private Auth: AuthService) {
    this.nearbyPlacesResults = [];
    this.itineraryArray = [];
    this.markersArray = [];
    this.search = '';
    this.zoom = 13;
    // CN-tower
    this.lat = 43.642624;
    this.lng = -79.387071;
  }

  ngOnInit() {
    // Get id from route
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Retrieve itinerary
      this.itineraryService.getItinerary(this.id)
      .subscribe((itinerary) => {
        if (itinerary) {
          this.serverItinerary = itinerary;
          this.itineraryName = itinerary.name;
          for (let i = 0; i < itinerary.locations.length; i++) {
            this.itineraryArray.push(itinerary.locations[i]);
            this.addMarker(itinerary.locations[i]);
          }
        } else {
          //Handle error
        }
        // Check auth for the current logged in user
        this.userSubscription = this.Auth.getUser().subscribe(user => {
          this.loggedInUser = user;
        });
      });
    });
  }
}
