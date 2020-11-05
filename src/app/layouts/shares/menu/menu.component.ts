import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  navbarCollapsed = true;

  constructor(private authenticationService: AuthenticationService,  private router: Router, private userService: UserService ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit(): void {
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed
  }

  onSignOut() {
    // this.userService.signOut().subscribe((user: User) => {
    //   if (user.isSingOut) {
    //     this.authenticationService.logout()
    //     this.router.navigate(['/'])
    //   }
    // })
  }
}
