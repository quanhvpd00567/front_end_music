import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthenticationService } from './../services/authentication.service';
import { HTTPStatusCode, ApiErrorCode } from './constant.enum';
import { ApiResponse } from '../responses/ApiResponse';
import { AppError } from './app-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(catchError(err => {
    //         if (err.status === 401) {
    //             // auto logout if 401 response returned from api
    //             this.authenticationService.logout();
    //             location.reload(true);
    //         }
            
    //         const error = err.error.message || err.statusText;
    //         return throwError(error);
    //     }))
    // }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
            .pipe(
                retry(1),
                catchError((response: HttpErrorResponse) => {
					let body = <ApiResponse<any>>response.error;
					switch (response.status) {
						case HTTPStatusCode.Ok:
							switch (body!.codeError) {
								case ApiErrorCode.ModelStateError:
									throw new AppError(body!.messageError, body!.codeError);
								default:
									throw new AppError(body!.messageError);
                            }
                        case HTTPStatusCode.Unauthorized:
                            this.authenticationService.logout();
                            location.reload(true);
						default: {
							if (body instanceof ApiResponse) {
								throw new AppError(body!.messageError);
							}
							throw body;
						}
					}
                })
            )
    }
}