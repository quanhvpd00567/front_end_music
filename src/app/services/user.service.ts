import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegister } from '../models/user.register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  constructor(private apiService: ApiService, private authenticationService: AuthenticationService) { }

  public refresh(){
    // this.apiService.get<User>(`${environment.base_url_api}/refresh-user`).subscribe(userRefresh => {
    //   this.authenticationService.currentUser.subscribe(user => {
    //     user.totalCoin = userRefresh.totalCoin
    //     localStorage.setItem('currentUser', JSON.stringify(user))
    //   });
    // })
  }

  public signOut() {
    // return this.apiService.post<User>(`${environment.base_url_api}/sign-out`, {});
  }

  public signUp(data) {
    // return this.apiService.post<UserRegister>(`${environment.base_url_api}/register`, data)
  }
}
