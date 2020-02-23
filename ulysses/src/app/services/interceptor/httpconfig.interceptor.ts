//code below taken from https://github.com/vigneshsithirai/Angular-Interceptor/
import { Injectable } from '@angular/core';
//TODO: make below service
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// @Injectable()
// export class HttpConfigInterceptor implements HttpInterceptor {

//     //TODO add service below
//     constructor( public errorDialogService: ErrorDialogService ) {};

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     }

// }