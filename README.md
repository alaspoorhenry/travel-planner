# Ulysses - A Travel Planner App

https://ulysses-app.herokuapp.com/home 

Video Link - https://youtu.be/1Dy8rPbVygg

API Documentatiom can be found in - /ulysses/src/server/

A web application for the purposes of creating, editing and sharing travel
itineraries.

Ulysses is a travel application designed to plan and organize your next trip. Whether it is a weekend get-together with your pals, or a month long trip around Europe, Ulysses is the tool for you. Through an interactive map, users can view or search up points of interests and add it to their itinerary. Looking for the best restaurant in the area is done easy through integrated reviews from Tripadvisor and Google reviews - Ulysses users can add their own reviews as well to alert fellow travelers of the must-sees in town!

Wondering where to start or simply just too lazy to start a trip from scratch? Browse through hundreds of itineraries, created by Ulysses users for Uslyses users, and pick the one that best fits your interest. You can import itineraries and make it uniquely yours!

Customized profiles make it easy to know what other users' interests are, as well as to share your profile with the outside world. Planning trips together is a breeze through real-time sharing of itineraries, all that's needed is to invite your friends onto the trip and get editing together.

## Team Members
 - Xu Sheng Gao (David)
 - Zhi Zhong Huang (Henry)
 - Truong Cong Anh (Anh)

 
## Beta Version -  Key Features
 - allow users to create accounts and log in
 - allow users to view a profile page
 - allow users to create itineraries
 - creating a dashboard to allow users to view other users' profiles
 - validate and secure user input
 - plot and obtain routes to locations using an embedded map api
 - real-time synchronization of editing itineraries


### Final Version -  Key Features
 - allow users to share or export their itineraries
 - allow users to save or favourite another user's itinerary
 - allow users to leave comments on specific sections of other users'
 itineraries
 - allow users to have autofill options and recommendations
 - create a visually pleasing UI for the users
 - make the webapp mobile-friendly
 - allow users to see the popularity of certain travel destinations based on the inclusion of these destinations in other users' itineraries. 
 - (tentative) Estimates cost/expenditure of the entire trip detailed by the itinerary relative to user's preferred currency. 
- (tentative) Recommends an already existing itinerary submitted by another user given search criteria (max cost of trip, locations desired to visit, etc). 
### Technologies

#### Front End:
 - Angular 7
 - Less CSS
 - Sass
 - Bootstrap

#### Back End:
 - NodeJS
 - MongoDB

#### APIs
 - Google Maps
 - Google Authentication
 - Autofill API
 - Tripadvisor/reviews API


### Top 5 Technical Challenges
 - updating the map's UI through the api whenever an user edits their itinerary
 - creating a dashboard to allow users to view other users' profiles
    - trying to use infinite scroll technology if possible to load itineraries
 - allowing users to leave comments on specific sections of other users'
  itineraries
    - and hiding the comments on the main dashboard
 - allowing users to have autofill options and recommendations without creating
 a massive amount of lag on user's end
 - resolving edge cases and creating blockers that has to do with synchronization of editing itineraries with multiple users
 - making a user-friendly UI which also functions well
 
 ## Getting Started
 
 1) Install MongoDB
 https://docs.mongodb.com/manual/administration/install-community/
 
 2) Create a folder to store the database data
 e.g. C:/data/db
 
 3) Start the mongoDB daemon
 e.g. `C:/Program Files/MongoDB/Server/4.0/bin/mongod --dbpath C:/data/db`
 
 4) Start the mongoDB application
 e.g. `C:/Program Files/MongoDB/Server/4.0/bin/mongo`
