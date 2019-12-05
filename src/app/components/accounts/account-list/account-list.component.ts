import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomerAccount } from 'src/app/_models/CustomerAccount';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accountList: CustomerAccount[] = [];
  customerNo: number;
  constructor(private transactionService: TransactionsService,
              private alertify: AlertifyService,
              private authService: AuthService) { }
  ngOnInit() {
    this.customerNo = 1000000000 + this.authService.decodedToken.nameid;
    this.GetAccounts();
    this.transactionService.deletedAccountNumber.subscribe((deletedAccountNumber: number) => {
      this.accountList.splice(this.accountList.findIndex(a => a.accountNumber === deletedAccountNumber), 1);
    });
    this.transactionService.updateAccounts.subscribe(() => {
      this.GetAccounts();
    });
  }
  GetAccounts() {
    this.transactionService.GetAccounts(this.authService.decodedToken.nameid).subscribe((res: CustomerAccount[]) => {
      this.accountList = res;
    });
  }
  newAccount() {
    this.alertify.confirm('Yeni hesap açmak istediğinize emin misiniz?', () => {
      this.transactionService.NewAccount(this.authService.decodedToken.nameid).subscribe( (res: CustomerAccount) => {
        this.alertify.success('Başarıyla yeni hesap açtınız');
        this.accountList.push(res);
      }, () => {
        this.alertify.error('Hesap açarken hata oluştu');
      });
    });
  }
}
