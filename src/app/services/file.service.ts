import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { FileClone } from '../models/file-clone';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver'
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private apiService: ApiService, private http: HttpClient) { }


  public getLink(url_file){
    // url_file = ''
    return this.apiService.post<FileClone>(`${environment.base_url_api}/file`, {url_file})
  }

  public downloadExcel(file_id) {
    return this.http.post(`${environment.base_url_api}/download`, {file_id}, { responseType: 'blob' })
  }

  public getFileClone(id){
    return this.apiService.get(`${environment.base_url_api}/file/${id}`)
  }
}
