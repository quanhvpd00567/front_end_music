import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MomoRes } from 'src/app/models/momo-res';
import { PaymentService } from 'src/app/services/payment.service';
import { Momo } from 'src/app/models/momo';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-momo-confirm',
  templateUrl: './payment-momo-confirm.component.html',
  styleUrls: ['./payment-momo-confirm.component.scss']
})
export class PaymentMomoConfirmComponent implements OnInit {

  momoRes: MomoRes
  user: User
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private authenticationService: AuthenticationService) { 
    this.route.queryParams.subscribe((params: MomoRes) => {
      console.log(params);
      
      this.momoRes = params
      this.momoUpdateStatus()
    });
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

  public momoUpdateStatus(){
    let params = {
      orderId: this.momoRes.orderId,
      signature: this.momoRes.signature
    }
    this.paymentService.momoUpdate(params).subscribe((res: Payment) => {
      if (res.status) {
        this.user = res.user 
        this.currentUser.totalCoin = res.user.totalCoin
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        // this.updateUser()
      }
    })
  }

  public updateUser() {
    
  }

}
