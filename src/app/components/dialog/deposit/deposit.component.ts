import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<DepositComponent>,
              private formBuilder: FormBuilder,
              private transactionService: TransactionsService,
              private alertify: AlertifyService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }
  onSubmit() {
    this.transactionService.MakeDeposit(this.data.accountNumber, this.depositForm.controls.price.value).subscribe( () => {
      this.alertify.success('Başarılı bir şekilde parayı yatırdınız');
      this.transactionService.updateAccounts.next();
      this.dialogRef.close();
    }, () => {
      this.alertify.error('Para yatırılması sırasında hata oluştu');
    });
  }

}
