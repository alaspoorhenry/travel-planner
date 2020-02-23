export class Itinerary {
  user?: string;
  name: string;
  date: string;
  locations: Place[];
  _id?: string;
  photoUrl?: string; // Don't save to server
}

export class Place {
  id: string;
  geometry: {lat: number, lng: number};
  name: string;
  photoUrl: string;
  rating: number;
  types: string[];
  totalUserRatings: number;
  address: string;
  compoundCode: string;
}
