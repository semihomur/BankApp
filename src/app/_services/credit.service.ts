import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { CreditCondition } from '../_models/CreditCondition';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
baseUrl = 'http://127.0.0.1:5000/api/';
constructor(private http: HttpClient) { }
EstimateCredit(estimateCreditFormValue: CreditCondition) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.post(this.baseUrl, {
    krediMiktari: estimateCreditFormValue.price,
    yas: +estimateCreditFormValue.age,
    evDurumu: !estimateCreditFormValue.homeCondition,
    aldigi_kredi_sayi: +estimateCreditFormValue.howManyTimesHaveYouTakenCredit,
    telefonDurumu: !estimateCreditFormValue.phoneCondition}, httpOptions);
}
}
