import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  //code below from https://blog.angularindepth.com/expecting-the-unexpected-best-practices-for-error-handling-in-angular-21c3662ef9e4
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
        return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }
  getClientStack(error: Error): string {
      return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
      return error.message;
  }

  getServerStack(error: HttpErrorResponse): string {
      // handle stack trace
      return 'stack';
  }
}
