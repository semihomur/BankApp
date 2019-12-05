import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/_services/bill.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { CustomerAccount } from 'src/app/_models/CustomerAccount';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paying-bills',
  templateUrl: './paying-bills.component.html',
  styleUrls: ['./paying-bills.component.css']
})
export class PayingBillsComponent implements OnInit {
  billForm: FormGroup;
  accountList: CustomerAccount[] = [];
  dept: any;
  constructor(private billService: BillService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private transactionService: TransactionsService,
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.transactionService.GetAccounts(this.authService.decodedToken.nameid).subscribe((res: CustomerAccount[]) => {
      this.accountList = res;
    });
    this.billForm = this.formBuilder.group({
      phoneNumber: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      account: [null]
    });
  }
  QueryDept(stepper: MatStepper) {
    this.billService.GetDept(this.billForm.controls.phoneNumber.value).subscribe((res: any) => {
      if (res.price == '0') {
        this.alertify.warning('Borcunuz yoktur');
      }
      if (res == '') {
        this.alertify.warning('Böyle bir telefon numarası aboneliği bulunamamaştır');
      }
      if (res != '' && res.price != '0') {
        this.dept = res.price;
        stepper.next();
        this.billForm.get('account').setValidators(Validators.required);
      }
    }, error => {this.alertify.error('Hata oluştu'); });
  }
  PayBill() {
    this.billService.PayDept(this.billForm.controls.phoneNumber.value,
      this.accountList[this.accountList.findIndex(a => a === this.billForm.controls.account.value)].accountNumber, this.dept)
      .subscribe(() => {
         this.alertify.success('Borcunuz başarılı bir şekilde ödendi');
         this.router.navigate(['hesaplarim']);
      }, () => {
        this.alertify.error('Yeterli bakiyeniz yok');
      });
  }
}
