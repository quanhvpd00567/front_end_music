import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user';
import { Token } from './../models/token';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { ApiResponse } from '../responses/ApiResponse';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password): Observable<User> {

        return this.http.post(`${environment.base_url_api}/auth`, {email, password})
        .pipe(map(response => {
            let user = (<ApiResponse<User>>response).result
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.currentUserSubject.next(user);
            return user
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}