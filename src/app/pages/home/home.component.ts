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
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  url: string = null;
  songs: Song[] = [];
  constructor(private authenticationService: AuthenticationService,
    private fileService: FileService,
    private toastService: ToastService,
    private router : Router) { }

  ngOnInit(): void {
    this.fileService.getSong().then((res: Song[]) => this.songs = res)
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  public onGetLink() {
    this.fileService.getDetailSong().then((res: any) => {
      this.url = res.url
    })
  }

}
