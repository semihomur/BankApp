import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material';
import { TransferToMyAccountComponent } from '../../dialog/transfer-to-my-account/transfer-to-my-account.component';
import { TransferToOtherAccountComponent } from '../../dialog/transfer-to-other-account/transfer-to-other-account.component';
import { DepositComponent } from '../../dialog/deposit/deposit.component';
import { WithdrawComponent } from '../../dialog/withdraw/withdraw.component';
import { CustomerAccount } from 'src/app/_models/CustomerAccount';
import { TransactionsService } from 'src/app/_services/transactions.service';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent implements OnInit {
  @Input() account: CustomerAccount;
  constructor(private alertify: AlertifyService,
              private transactionService: TransactionsService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }
  TransferInMyOtherAccount() {
    this.dialog.open(TransferToMyAccountComponent, {
      width: '400px',
      data: {accountNumber: this.account.accountNumber}
    });
  }
  TransferInOtherAccount() {
     this.dialog.open(TransferToOtherAccountComponent, {
      width: '400px',
      data: {accountNumber: this.account.accountNumber}
    });
  }
  Deposit() {
     this.dialog.open(DepositComponent, {
      width: '400px',
      data: {accountNumber: this.account.accountNumber}
    });
  }
  Withdraw() {
     this.dialog.open(WithdrawComponent, {
      width: '400px',
      data: {accountNumber: this.account.accountNumber}
    });
  }
  DeleteAccount() {
    this.alertify.confirm('Bu hesabı silmek istediğinize emin misiniz?', () => {
     this.transactionService.FreezeAccount(this.account.accountNumber).subscribe(() => {
      this.alertify.success('Hesabınız başarıyla silindi');
      this.transactionService.deletedAccountNumber.next(this.account.accountNumber);
     }, () => {
       this.alertify.error('Bakiyenizin 0 olmadığı hesabı silemezsiniz');
     });
    });
  }

}
