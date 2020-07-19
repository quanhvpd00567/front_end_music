import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription, empty } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import { HistoryGet } from 'src/app/models/history-get';
import { ToastService } from 'src/app/services/toast.service';
import { Messages } from 'src/app/_helpers/constant.enum';
import { isUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  url: string;
  constructor(private authenticationService: AuthenticationService,
    private fileService: FileService,
    private toastService: ToastService,
    private router : Router) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  public onGetLink(){

    if(this.currentUser == null) {
      this.toastService.show(Messages['E007'], {
        classname: 'bg-danger text-white',
        delay: 5000 ,
        autohide: true,
        headertext: 'Notifation'
      })
      return false;
    }
    if (isUndefined(this.url) || this.url == '') {
      this.toastService.show(Messages['E0010'], {
        classname: 'bg-danger text-white',
        delay: 5000 ,
        autohide: true,
        headertext: 'Notifation'
      })
    } else {
      this.fileService.getLink(this.url).subscribe((data: HistoryGet) => {
        this.currentUser.totalCoin = data.totalCoin
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        this.router.navigate(['/user/history/'+ data.historyGetFileId]);
      })
    }
  }

}
