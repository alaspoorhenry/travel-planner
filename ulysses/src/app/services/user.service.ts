import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.models';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NotiService } from '../shared/components/not-serv/noti.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private notiService: NotiService) { }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    const url = this.baseUrl + '/api/user/' + id;
    return this.http.get<User>(url).pipe(
      tap(() => console.log(`user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** GET user by id. Will 404 if id not found */
  updateUser(id: string, newUser): Observable<User> {
    const url = this.baseUrl + '/api/user/' + id;
    return this.http.patch<User>(url, newUser).pipe(
      tap(() => console.log(`user id=${id} updated`)),
      catchError(this.handleError<User>(`updateUser id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
