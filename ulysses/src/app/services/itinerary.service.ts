import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Itinerary, Place } from './itinerary.models';
import { NotiService } from '../shared/components/not-serv/noti.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ItineraryService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private notiService: NotiService
    ) {

  }

  /** GET itinerary locations by id. Will 404 if id not found */
  getItinerary(id: string): Observable<Itinerary> {
    const url = this.baseUrl + '/api/itineraries/' + id + '/itinerary';
    return this.http.get<Itinerary>(url).pipe(
      tap(() => console.log(`itinerary id=${id}`)),
      catchError(this.handleError<Itinerary>(`getItinerary id=${id}`))
    );
  }

  /** GET itineraries by page*/
  getItineraries(page: number): Observable<Itinerary[]> {
    const url = this.baseUrl + '/api/itineraries/' + page + '/';
    return this.http.get<Itinerary[]>(url).pipe(
      tap(() => console.log(`itinerary page=${page}`)),
      catchError(this.handleError<Itinerary[]>(`getItineraries page=${page}`))
    );
  }

  getUserItineraries(userId: string): Observable<Itinerary[]> {
    const url = this.baseUrl + '/api/itineraries/user/' + userId;
    return this.http.get<Itinerary[]>(url).pipe(
      tap(() => console.log(`itineraries userId=${userId}`)),
      catchError(this.handleError<Itinerary[]>(`getUserItineraries userId=${userId}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new itinerary to the server */
  addNewItinerary(): Observable<Itinerary> {
    let date = new Date().toString();
    let itinerary = {name: 'My itinerary', date: date, locations: []};
    const url = this.baseUrl + '/api/itineraries/';
    return this.http.post<Itinerary>(url, itinerary, httpOptions).pipe(
      tap(() => console.log(`added itinerary `)),
      catchError(this.handleError<Itinerary>('addItinerary'))
    );
  }

  /** DELETE: delete the itinerary from the server */
  deleteItinerary(id: string): Observable<Itinerary> {
    const url = this.baseUrl + '/api/itineraries/' + id;

    return this.http.delete<Itinerary>(url, httpOptions).pipe(
      tap(() => console.log(`deleted itinerary id=${id}`)),
      catchError(this.handleError<Itinerary>('deleteItinerary'))
    );
  }

  /** PATCH: update the itinerary from the server */
  updateItinerary(id: string, field: string, value: any): Observable<Itinerary> {
    const url = this.baseUrl + '/api/itineraries/' + id;
    const payload = {action: field, [field]: value};
    return this.http.patch<Itinerary>(url, payload, httpOptions).pipe(
      tap(() => console.log(`update itinerary `)),
      catchError(this.handleError<Itinerary>('updateItinerary'))
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
