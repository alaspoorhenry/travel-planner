## 1. API

To test our api, we are going to use the program `curl` (alternatively you can use [Postman](https://www.getpostman.com/)). For instance, our api should answer to this command: 

```
$ curl --verbose --request POST --header 'Content-Type: application/json' --data '{"title": "Hello World!", "author": "Me", "picture": {"path": "<PATH TO A PICTURE>"}}' http://localhost:3000/api/users
```
1. sign up

    - Method: `POST`
    - Url: `/signup/`
    - Request body  (JSON object): `{"username": "test", "password":
    "test"`
    - Response Body (JSON object): `user test signed up`

1. sign in

    - Method: `POST`
    - Url: `/signup/`
    - Request body  (JSON object): `{"username": "test", "password":
    "test"`
    - Response Body (JSON object): `user test signed in`

1. sign out

    - Method: `GET`
    - Url: `/signout/`

1. Create an itinerary

    - Method: `POST`
    - Url: `/api/itineraries/`
    - Request body  (JSON object): `{"name": "My itinerary", "author":
    session.user, date: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)',
    locations: [] }
    - Response Body (JSON object): {
    user: user.id,
    username: user.name,
    name: "My Itinerary",
    origin: origin,
    destination: desitination,
    date: Date,
    locations: [],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' }
  }

1. Add a location to existing itinerary

  - Method: `PATCH`
  - Url: `/api/itineraries/<itinerary id>`  
  - Request body (JSON object): { action: 'locations',
  locations:
   [ { geometry: [Object],
       name: 'CN Tower',
       id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
       photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
       rating: 4.5,
       types: [Array],
       address: '301 Front St W, Toronto',
       totalUserRatings: 25293 },
     { geometry: [Object],
       name: 'Furnished Apartment Toronto',
       id: '6f857af756c9dee31b5d40195bc269b5f0cef683',
       photoUrl: null,
       rating: 3.8,
       types: [Array],
       address: '25 Lower Simcoe St #925, Toronto',
       totalUserRatings: 4 } ] }
- Response Body (JSON object) (Itinerary object): {
    user: user.id,
    username: user.name,
    name: "My Itinerary",
    origin: origin,
    destination: desitination,
    date: Date,
    locations: [ { geometry: [Object], name: 'CN Tower', id: '9220d35aecda78cd4c380da77fe3dbea0008af71', photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205', rating: 4.5, types: [Array], address: '301 Front St W, Toronto', totalUserRatings: 25293 }, { geometry: [Object], name: 'Furnished Apartment Toronto', id: '6f857af756c9dee31b5d40195bc269b5f0cef683', photoUrl: null, rating: 3.8, types: [Array], address: '25 Lower Simcoe St #925, Toronto', totalUserRatings: 4 } ],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' }
  }

1. Add a location to existing itinerary

  - Method: `PATCH`
  - Url: `/api/user/<user id>`
  - Request body (JSON object): { firstName: "Henry", lastName: "Henry", email: "Henry@Henry.com", phoneNumber: "1234", info: "My name is Henry" }
  - Response body (JSON object): { firstName: "Henry", lastName: "Henry", email: "Henry@Henry.com", phoneNumber: "1234", info: "My name is Henry", fullName: "Henry Henry"}

1. Get itineraries of page, 8 itineraries max per page

  - Method: `GET`
  - Url: `/api/itineraries/<page#>`
  - Response body (JSON object) (Itinerary object)[]: { [    
    {
    user: user.id
    username: user.name,
    name: "Bob's Itinerary",
    origin: origin,
    destination: destination,
    date: Date,
    locations: [],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' },
    {
    user: user.id,
    username: user.name,
    name: "Susan's Itinerary 2",
    origin: origin,
    destination: destination,
    date: Date,
    locations: [],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' }] }

1. Get all itineraries of user

  - Method: `GET`
  - Url: `/api/itineraries/user/<user id>`
  - Response body (JSON object) (Itinerary object)[]: { [    
    {
    user: user.id
    username: user.name,
    name: "My Itinerary 1",
    origin: origin,
    destination: destination,
    date: Date,
    locations: [],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' },
    {
    user: user.id,
    username: user.name,
    name: "My Itinerary 2",
    origin: origin,
    destination: destination,
    date: Date,
    locations: [],
    updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)' }] }  

1. Get all locations of itinerary

  - Method: `GET`
  - Url: `/api/itineraries/<itinerary id>/locations`
  - Response body (JSON object) (Location object)[]: { [    
    { geometry: [Object],
      name: 'CN Tower',
      id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
      photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
      rating: 4.5,
      types: [Array],
      address: '301 Front St W, Toronto',
      totalUserRatings: 25293 }
    ]}  

1. Get itinerary given id

  - Method: `GET`
  - Url: `/api/itineraries/<itinerary id>/itinerary`
  - Response body (JSON object) (Itinerary object): {
  user: user.id
  username: user.name,
  name: "Bob's Itinerary",
  origin: origin,
  destination: destination,
  date: Date,
  locations: [],
  updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)'}  

1. Get a location given id

  - Method: `GET`
  - Url: `/api/locations/<itinerary id>`
  - Response body (JSON object) (Location object): {
    geometry: [Object],
    name: 'CN Tower',
    id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
    photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
    rating: 4.5,
    types: [Array],
    address: '301 Front St W, Toronto',
    totalUserRatings: 25293 }
    

1. Delete an itinerary given itinerary id

    - Method `DELETE`
    - Url: `/api/itineraries/<itinerary id>`
    - Request body (JSON object): {}
    - Response body (JSON object) (Itinerary Object with id given in parameters): {
      user: user.id
      username: user.name,
      name: "Bob's Itinerary",
      origin: origin,
      destination: destination,
      date: Date,
      locations: [],
      updated: { type: Date, default: 'Fri Apr 05 2019 15:19:09 GMT-0400 (Eastern Daylight Time)'}  

1. Delete a location given location id

    - Method `DELETE`
    - Url: `/api/locations/<location id>`
    - Request body (JSON object): {}
    - Response body (JSON object) (Location object): {
        geometry: [Object],
        name: 'CN Tower',
        id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
        photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
        rating: 4.5,
        types: [Array],
        address: '301 Front St W, Toronto',
        totalUserRatings: 25293 }
  
1. Update user image
  
    - Method `POST`
    - Url: `/api/user/:id/image/`
    - Request body (it's a file)
    - Response body (JSON Object) (User Object): {
      firstName: "Henry",
      lastName: "Henry",
      fullName: "Henry Henry"
      username: "Henry1",
      updated: true,
      picture: (Some Encrypted Picture)
    }
    
1. Sends a location to the server

    - Method `POST`
    - Url: `/api/locations/`
    - Request body (Location object) (JSON object): {
        geometry: [Object],
        name: 'CN Tower',
        id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
        photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
        rating: 4.5,
        types: [Array],
        address: '301 Front St W, Toronto',
        totalUserRatings: 25293 }
    - Response body: {
        geometry: [Object],
        name: 'CN Tower',
        id: '9220d35aecda78cd4c380da77fe3dbea0008af71',
        photoUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAb4VPxEo--_YpIaFDjQOafWli5p_K9nPjGXOLZn_NM6de29xwr8GxxnRbh_dLQYv5ZiQkKS0YMYPaMXi99BFgLmMio_QW5QjVvTMjhnqg8Lhhp_MqVqCYzNTOSVuD7_hBEhDKWQSMMZ_03U3qEhed1By0GhRu_oNuH38oBATgTyzr_7NqJHCSLQ&3u500&4u300&5m1&2e1&callback=none&key=AIzaSyAGv-sNJ1BUEkTjBqPqvHhqFfwnA7hfDdw&token=95205',
        rating: 4.5,
        types: [Array],
        address: '301 Front St W, Toronto',
        totalUserRatings: 25293 }
