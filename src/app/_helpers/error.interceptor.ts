import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { AuthenticationService } from './../services/authentication.service';
import { HTTPStatusCode, ApiErrorCode, Messages } from './constant.enum';
import { ApiResponse } from '../responses/ApiResponse';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private toastService: ToastService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    let body = <ApiResponse<any>>event.body
                    if (body!.errorCode == 'S001') {
                        this.toastService.show(body!.messageCode, {
                            classname: 'bg-success text-white',
                            delay: 5000 ,
                            autohide: true,
                            headertext: 'Notification'
                        });
                    }
                }
                return event;
            }),

            catchError((error: HttpErrorResponse) => {
                let body = <ApiResponse<any>>error.error;
                switch (error.status) {
                    case HTTPStatusCode.bad_request:
                        this.toastService.show(Messages[body!.errorCode], {
                            classname: 'bg-danger text-white',
                            delay: 5000 ,
                            autohide: true,
                            headertext: 'Notification'
                        });
                        break
                    case HTTPStatusCode.Unauthorized:
                        this.toastService.show(body!.messageCode, {
                            classname: 'bg-danger text-white',
                            delay: 10000 ,
                            autohide: true,
                            headertext: body!.errorCode
                        });
                        this.authenticationService.logout();
                        location.reload(true)
                        break
                    case 422:
                        break
                    default:
                        this.toastService.show(Messages.E000, {
                            classname: 'bg-danger text-white',
                            delay: 5000 ,
                            autohide: true,
                            headertext: 'Notification'
                        });
                        break
                }
                return throwError(error)
            })
        )
    }
}