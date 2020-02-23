import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from "./auth.models";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  uploadImage(id: string, image: File): Observable<Object> {
    const formData = new FormData();
    formData.append('image', image);
    const imageUrl = this._baseUrl + '/api/users/' + id + "/image";
    return this.http.post(imageUrl, formData).pipe(
      tap(() => {
        console.log(`image successfully uploaded`);
      }),
      catchError(this.handleError<Object>(`uploadImage`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
