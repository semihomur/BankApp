import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
baseUrl = environment.apiUrl + 'accounts/';
deletedAccountNumber = new Subject();
updateAccounts = new Subject();
constructor(private http: HttpClient) { }
GetAccounts(userId: number) {
  return this.http.get(this.baseUrl + userId);
}
NewAccount(userId: number) {
  return this.http.post(this.baseUrl + 'add', {customerid: userId});
}
MakeDeposit(accountNumber, money) {
  return this.http.post(this.baseUrl + 'paymoney', {accountNumber, money});
}
MakeWithdraw(accountNumber, money) {
  return this.http.post(this.baseUrl + 'withdrawmoney', {accountNumber, money});
}
SendToMyAccount(ReceivingAccountId: number, SendingAccountId: number, Money: number) {
  return this.http.post(this.baseUrl + 'virman', {ReceivingAccountId, SendingAccountId, Money});
}
SendToOtherAccount(ReceivingAccountId: number, SendingAccountId: number, money: number) {
  return this.http.post(this.baseUrl + 'havale', {ReceivingAccountId, SendingAccountId, money});
}
FreezeAccount(accountNumber) {
  return this.http.post(this.baseUrl + 'freeze', {accountNumber});
}
}
