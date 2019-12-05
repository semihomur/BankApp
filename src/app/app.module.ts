import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { AccountItemComponent } from './components/accounts/account-item/account-item.component';
import { TransactionsService } from './_services/transactions.service';
import { PayingBillsComponent } from './components/paying-bills/paying-bills.component';
import { CreditEstimateComponent } from './components/credit-estimate/credit-estimate.component';
import { TransferToMyAccountComponent } from './components/dialog/transfer-to-my-account/transfer-to-my-account.component';
import { TransferToOtherAccountComponent } from './components/dialog/transfer-to-other-account/transfer-to-other-account.component';
import { DepositComponent } from './components/dialog/deposit/deposit.component';
import { WithdrawComponent } from './components/dialog/withdraw/withdraw.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guards/auth-guard.service';
import { BillService } from './_services/bill.service';
import { NumberDirective } from './directive/numbers-only.directive';
import { CreditService } from './_services/credit.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AccountListComponent,
    AccountItemComponent,
    PayingBillsComponent,
    CreditEstimateComponent,
    TransferToMyAccountComponent,
    TransferToOtherAccountComponent,
    DepositComponent,
    WithdrawComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
         // tslint:disable-next-line:object-literal-shorthand
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   })
  ],
  entryComponents: [
    TransferToMyAccountComponent,
    TransferToOtherAccountComponent,
    DepositComponent,
    WithdrawComponent
  ],
  providers: [
    AuthService,
    AlertifyService,
    TransactionsService,
    BillService,
    CreditService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
