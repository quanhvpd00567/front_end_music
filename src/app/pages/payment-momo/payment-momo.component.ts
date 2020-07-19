import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-momo',
  templateUrl: './payment-momo.component.html',
  styleUrls: ['./payment-momo.component.scss']
})
export class PaymentMomoComponent implements OnInit {

  isOther: boolean = false;
  amount: string = '20000';
  categoryOption: string = 'EX001'

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  handleChange(evt){ 
    this.isOther = false;
    switch(evt) {
      case 1: {
        this.amount = '20000'
        this.categoryOption = 'EX001'
        break
      }
      case 2: {
        this.amount = '50000'
        this.categoryOption = 'EX002'
        break
      }
      case 3: {
        this.amount = '500000'
        this.categoryOption = 'EX00_VIP'
        break
      }
      case 4: {
        this.isOther = true
        this.categoryOption = 'EX00_OTHER'
        this.amount = ''
        break
      }
    }
  }

  onChangeAmountOther(evt) {
    console.log(this.amount);
  }

  onPaymentMomo(){
    if (this.amount == '') {
      alert('please select option')
      return false
    }

    let params = {
      amount: this.amount,
      orderInfo: this.categoryOption
    }

    this.paymentService.requestMomo(params)
  }

}
