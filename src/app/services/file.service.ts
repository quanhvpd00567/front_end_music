import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { HistoryGet } from '../models/history-get';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver'
import { UserService } from './user.service';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private apiService: ApiService, private http: HttpClient, private toastService: ToastService) { }

  public getLink(url_file){
    return this.apiService.post<HistoryGet>(`${environment.base_url_api}/file`, {url_file})
  }

  public downloadExcel(file_id) {
    return this.http.get(`${environment.base_url_api}/download/${file_id}`, { responseType: 'blob' })
  }

  public getFileClone(id){
    return this.apiService.get(`${environment.base_url_api}/file/${id}`)
  }

  public getHistories(){
    return this.apiService.get(`${environment.base_url_api}/histories`)
  }

  public getSong() {
    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`${environment.base_url_api}/songs`).then(data => {
        resolve(data.data)
      }).catch(error => {
        // this.toastService.show(error.error.message, {
        //   classname: 'bg-danger text-white',
        //   delay: 5000 ,
        //   autohide: true,
        //   headertext: 'Notifation'
        // })
        reject(error)
      })
    });
    return promise
  }

  public getDetailSong() {
    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`${environment.base_url_api}/songs/detail`).then(data => {
        resolve(data.data)
      }).catch(error => {
        // this.toastService.show(error.error.message, {
        //   classname: 'bg-danger text-white',
        //   delay: 5000 ,
        //   autohide: true,
        //   headertext: 'Notifation'
        // })
        reject(error)
      })
    });
    return promise
  }
}
