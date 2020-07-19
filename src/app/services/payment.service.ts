import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Momo } from '../models/momo';
import { Payment } from '../models/payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }

  public requestMomo(params) {
    this.apiService.post<Momo>(`${environment.base_url_api}/momo`, params).subscribe((res: Momo) => {
      if (res.url == null){
        return false
      }
      window.location.href = res.url
    })
  }

  public momoUpdate(params) {
    return this.apiService.post<Payment>(`${environment.base_url_api}/momo-update-status`, params)
  }
}
