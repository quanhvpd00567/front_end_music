import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from './../responses/ApiResponse';
import { ResponseApi } from './../responses/ResponseApi';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient) {
    }

    // Get method

    public get(url: string, params?: any) {
        return this.httpClient.get<ResponseApi>(url).toPromise()
    }

    // Post method
    public post<T>(url: string, body?: any): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient
            .post(url, body, httpOptions)
            .pipe(map(response => (<ApiResponse<T>>response).result));
    }

    // Put method
    public put<T>(url: string, body?: any): Observable<T> {
        return this.httpClient
            .put(url, body)
            .pipe(map(response => (<ApiResponse<T>>response).result));
    }

    // Delete method
    public delete<T>(url: string): Observable<T> {
        return this.httpClient
            .delete(url)
            .pipe(map(response => (<ApiResponse<T>>response).result));
    }

    // public download(url: string, body?: any): Observable<Blob>{
    //     return this.httpClient.post(url, body).pipe(map(response => {
    //         console.log(response);
            
    //         return response
    //     }))
    // }
}