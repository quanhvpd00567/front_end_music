import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  url: string = "https://www.freepik.com/premium-psd/food-text-style-effect_8567164.htm"
  showToast: boolean = false
  constructor(private authenticationService: AuthenticationService,
    private fileService: FileService,
    private userService: UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    //
  }

  public onGetLink(){
    this.fileService.getLink(this.url).subscribe(data => {
      this.userService.refresh()
      this.showToast = !this.showToast
      this.router.navigate(['/user/download/'+ data.fileId]);
    })
  }

}
