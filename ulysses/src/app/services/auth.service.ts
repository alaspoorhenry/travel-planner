import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterDetails, LoginDetails, User } from './auth.models';
import { NotiService } from '../shared/components/not-serv/noti.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // withCredentials: true
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _baseUrl = environment.baseUrl;


  private _registerUrl = this._baseUrl+ "/signup/";
  private _loginUrl = this._baseUrl+ "/signin/";
  private _signoutUrl = this._baseUrl + "/signout/";

  private loggedInUser: ReplaySubject<any> = new ReplaySubject<any>(1);

  getUser(): Observable<any> {
    return this.loggedInUser.asObservable();
  }


  constructor(
    private http: HttpClient,
    private notiService: NotiService) {
   }

  loginUser(userDetails): Observable<User> {
    return this.http.post<User>(this._loginUrl, userDetails, httpOptions).pipe(
      tap((user) => {
        console.log(`user logged in username=${userDetails.username}`);
        this.loggedInUser.next({ user: user.username, _id : user._id});
      }),
      catchError(this.handleError<User>('loginUser'))
    );
  }

  registerUser(userDetails): Observable<User> {
    return this.http.post<User>(this._registerUrl, userDetails, httpOptions).pipe(
      tap(() => console.log(`user registered username=${userDetails.username}`)),
      catchError(this.handleError<User>('registerUser'))
    );
  }

  logout(): Observable<Object> {
    return this.http.get(this._signoutUrl).pipe(
      tap(() => {
        console.log(`user logged out`);
        this.loggedInUser.next({ user: undefined });
      }),
      catchError(this.handleError<Object>(`logout`))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      this.notiService.errorNotificaton(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
