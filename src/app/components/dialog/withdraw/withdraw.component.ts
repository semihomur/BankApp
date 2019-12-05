import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TransactionsService } from 'src/app/_services/transactions.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<WithdrawComponent>,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              private transactionService: TransactionsService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }
  onSubmit() {
    this.transactionService.MakeWithdraw(this.data.accountNumber, this.withdrawForm.controls.price.value).subscribe( () => {
      this.alertify.success('Başarılı bir şekilde para çekildi');
      this.transactionService.updateAccounts.next();
      this.dialogRef.close();
    }, () => {
      this.alertify.error('Lütfen çekmek istediğiniz miktarın bakiyenizden düşük olduğunuza emin olunuz');
    });
  }

}
