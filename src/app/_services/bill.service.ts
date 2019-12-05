import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {
baseUrl = environment.apiUrl + 'accounts/';
constructor(private http: HttpClient) { }
GetDept(phoneNumber: number) {
  return this.http.get(this.baseUrl + 'querydebt/' + phoneNumber);
}
PayDept(phoneNumber: number, accountNumber: number, dept: number) {
  return this.http.post(this.baseUrl + 'paydebt/' + phoneNumber, {accountNumber, dept});
}
}
