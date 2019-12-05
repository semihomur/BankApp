import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CustomerAccount } from 'src/app/_models/CustomerAccount';

@Component({
  selector: 'app-transfer-to-my-account',
  templateUrl: './transfer-to-my-account.component.html',
  styleUrls: ['./transfer-to-my-account.component.css']
})
export class TransferToMyAccountComponent implements OnInit {
  transferMyAccountForm: FormGroup;
  accountList: CustomerAccount[] = [];
  constructor(public dialogRef: MatDialogRef<TransferToMyAccountComponent>,
              private transactionService: TransactionsService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.transferMyAccountForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]]
    });
    this.transactionService.GetAccounts(this.authService.decodedToken.nameid).subscribe((res: CustomerAccount[]) => {
      this.accountList = res;
      this.accountList.forEach((element, index) => {
          if (element.accountNumber === this.data.accountNumber) {
            this.accountList.splice(index, 1);
          }
      });
    });
  }
  onSubmit() {
    this.transactionService.SendToMyAccount(
    this.accountList[this.accountList.findIndex(a  => a === this.transferMyAccountForm.controls.account.value)].accountNumber,
    this.data.accountNumber,
    this.transferMyAccountForm.controls.price.value).subscribe( () => {
      this.alertify.success('Para başarıyla gönderildi');
      this.transactionService.updateAccounts.next();
      this.dialogRef.close();
    }, () => {
      this.alertify.error('Lütfen göndermek istediğiniz miktarın bakiyenizden düşük olduğunuza emin olunuz');
    });
  }

}
