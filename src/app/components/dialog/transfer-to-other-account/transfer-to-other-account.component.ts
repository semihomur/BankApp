import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-transfer-to-other-account',
  templateUrl: './transfer-to-other-account.component.html',
  styleUrls: ['./transfer-to-other-account.component.css']
})
export class TransferToOtherAccountComponent implements OnInit {
  transferOtherAccountForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<TransferToOtherAccountComponent>,
              private transactionService: TransactionsService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.transferOtherAccountForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }
  onSubmit() {
    this.transactionService.SendToOtherAccount(
      this.transferOtherAccountForm.controls.account.value,
      this.data.accountNumber,
      this.transferOtherAccountForm.controls.price.value).subscribe( () => {
        this.alertify.success('Para başarıyla gönderildi');
        this.transactionService.updateAccounts.next();
        this.dialogRef.close();
      }, () => {
        this.alertify.error('Lütfen göndermek istediğiniz miktarın bakiyenizden düşük olduğundan ve göndereceğiniz hesap numarasının doğruluğundan emin olunuz');
      });
  }

}
