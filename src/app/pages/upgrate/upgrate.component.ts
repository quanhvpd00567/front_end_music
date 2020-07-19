import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { HistoryGet } from 'src/app/models/history-get';
import { saveAs } from 'file-saver'
import { isNull } from 'util';
import { UserService } from 'src/app/services/user.service';
import { File } from 'src/app/models/file';

@Component({
  selector: 'app-upgrate',
  templateUrl: './upgrate.component.html',
  styleUrls: ['./upgrate.component.scss']
})
export class UpgrateComponent implements OnInit {

  id: number;
  file: File;
  isDownload: boolean = false;
  textDownload: string = 'Download file'
  isDownloading: boolean = false
  isShowNotifyWaiting: boolean = false
  historyId: string
  constructor(private _route: ActivatedRoute, private fileService: FileService, private _routes: Router, private userService: UserService) { 
    this.historyId =  this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fileService.getFileClone(this.historyId).subscribe((data: File) => {
      this.file = data

      // If file not exist
      if (isNull(this.file)){
        this._routes.navigate(['user/error-404'])
      }

      // If file not has in server
      if (this.file.fileName == '') {
        this.isDownload = !this.isDownload
        this.isShowNotifyWaiting = !this.isShowNotifyWaiting
      }
    });
  }

  /**
   * Handle download file
   */
  public onDownload() {
    this.id = this.file.id
    this.textDownload = 'Downloading...'
    this.isDownloading = !this.isDownloading
    this.fileService.downloadExcel(this.id).subscribe((response: Blob) => {
      let fileName = `getlinknhanh.com_${this.file.fileName}`
      saveAs(response, fileName)
      this.textDownload = 'Download file'
      this.isDownloading = !this.isDownloading
    });
  }

  public onRedirect() {
    this._routes.navigate(['/']);
  }

}
