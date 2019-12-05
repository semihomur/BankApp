import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditService } from 'src/app/_services/credit.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-credit-estimate',
  templateUrl: './credit-estimate.component.html',
  styleUrls: ['./credit-estimate.component.css']
})
export class CreditEstimateComponent implements OnInit {
  homeConditions: any = [{value: false, displayValue: 'Yok'}, {value: true, displayValue: 'Var'}];
  phoneConditions: any = [{value: false, displayValue: 'Yok'}, {value: true, displayValue: 'Var'}];
  estimateCreditForm: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private alertify: AlertifyService,
              private creditService: CreditService) { }

  ngOnInit() {
    this.estimateCreditForm = this.formBuilder.group({
      age: [this.authService.decodedToken.birthdate],
      homeCondition: [null, [Validators.required]],
      phoneCondition: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.maxLength(11)]],
      howManyTimesHaveYouTakenCredit: [null, [Validators.required]]
    });
  }
  onSubmit() {
    this.creditService.EstimateCredit(this.estimateCreditForm.value).subscribe( (res) => {
      res ? this.alertify.error('Kredi durumunuz olumsuzdur') : this.alertify.success('Kredi durumunuz olumludur');
    }, () => {
      this.alertify.error('Kredi durumu sorgularken hata oluştu');
    });
  }

}
