import { Component, OnInit } from '@angular/core';
import {LoanCalculator} from '../../services/loanCalcApi';

@Component({
  selector: 'app-loan-calc',
  templateUrl: './loan-calc.component.html',
  styleUrls: ['./loan-calc.component.scss']
})
export class LoanCalcComponent implements OnInit {
amountVal: any;
month: any;
  interestRate: string;
  monthlyPayment: string;
  opened: boolean = false;
  recentAmt: any;
  recentMonth: any;
  constructor(private service: LoanCalculator) { }

  ngOnInit() {
  }

  calculate(amountValue: any) {
    this.amountVal = amountValue;
    if (!!this.month && !!amountValue) {
     if ((this.month >= 6 && this.month < 13) && amountValue >= 500 && amountValue <= 5000 ) {
       const amount = amountValue.toString();
       this.setLocalStorage();
       return this.service.getData(amount, this.month).subscribe(
         (data: any) => {
           if (!!data) {
             this.interestRate = data.interestRate;
             this.monthlyPayment = data.monthlyPayment.amount;
           }
         });
     } else if (this.amountVal < 500 || this.amountVal > 5000) {
       alert('Please Enter  Amount Between 500 to 5000 ');
     } else if (this.month < 6 || this.month > 12) {
       alert('Please Enter  Month Between 6 to 12 ');
     }
   }
  }
  recentValueCal(amount: string, month: string) {
    this.opened = !this.opened;
    this.amountVal = amount;
    this.month = month;
    return this.service.getData(amount, month).subscribe(
  (data: any) => {
    if (!!data) {
      console.log('dataaaaaaaaaaaaa ' + JSON.stringify(data));
      this.interestRate = data.interestRate;
      this.monthlyPayment = data.monthlyPayment.amount;
    }  }
);
  }

  private _toggleSidebar() {
    if (localStorage.getItem('recent')) {
    this.recentAmt = JSON.parse(localStorage.getItem('recent'));
    }
    this.opened = !this.opened;
  }

  setLocalStorage() {
    let recentData = [];
    recentData = JSON.parse(localStorage.getItem('recent')) || [];
    recentData.push({
      amount: this.amountVal,
      month: this.month
    });
    localStorage.setItem('recent', JSON.stringify(recentData));

  }
}
