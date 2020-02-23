import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material";
import {} from "@agm/core/services/google-maps-types";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AgmDirectionModule } from "agm-direction"; // agm-direction
import { NotifierModule } from "angular-notifier";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PlanComponent } from "./plan/plan.component";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./register/register.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { CreditsComponent } from "./credits/credits.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "plan/:id", component: PlanComponent },
  { path: "plan", redirectTo: "/home", pathMatch: "full" },
  { path: "profile/:id", component: ProfileComponent },
  { path: "profile", redirectTo: "/home", pathMatch: "full" },
  { path: "editprofile/:id", component: EditProfileComponent },
  { path: "editprofile", redirectTo: "/home", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "credits", component: CreditsComponent },
  { path: "404", component: PageNotFoundComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    PlanComponent,
    RegisterComponent,
    TopbarComponent,
    CreditsComponent,
    FooterComponent,
    EditProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    GooglePlaceModule,
    MatDialogModule,
    NgbModule,
    NotifierModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB68OsgNjAzAGFpiVvylf0O2p9UPKSpt4U",
      libraries: ["places"]
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
