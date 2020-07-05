import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { FileClone } from 'src/app/models/file-clone';
import { saveAs } from 'file-saver'
import { isNull } from 'util';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upgrate',
  templateUrl: './upgrate.component.html',
  styleUrls: ['./upgrate.component.scss']
})
export class UpgrateComponent implements OnInit {

  id: string;
  file: FileClone;
  isDownload: boolean = false;
  textDownload: string = 'Download file'
  isDownloading: boolean = false
  isShowNotifyWaiting: boolean = false
  constructor(private _route: ActivatedRoute, private fileService: FileService, private _routes: Router, private userService: UserService) { 
    this.id =  this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fileService.getFileClone(this.id).subscribe((data: FileClone) => {
      this.file = data
      if (isNull(this.file)){
        this.isDownload = !this.isDownload
        this.isShowNotifyWaiting = !this.isShowNotifyWaiting
        this._routes.navigate(['user/error-404'])
      }
    });

    // Refresh user info

   
  }

  /**
   * Handle download file
   */
  public onDownload() {
    this.textDownload = 'Downloading...'
    this.isDownloading = !this.isDownloading
    this.fileService.downloadExcel(this.id).subscribe((response: Blob) => {
      saveAs(response, this.file.fileName)
      this.textDownload = 'Download file'
      this.isDownloading = !this.isDownloading
    });
  }

  public onRedirect() {
    this._routes.navigate(['/']);
  }

}
