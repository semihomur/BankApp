import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { PayingBillsComponent } from './components/paying-bills/paying-bills.component';
import { CreditEstimateComponent } from './components/credit-estimate/credit-estimate.component';
import { AuthGuard } from './_guards/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'kayitol', component: RegisterComponent},
  {path: 'girisyap', component: LoginComponent},
  {path: 'hesaplarim', component: AccountListComponent, canActivate: [AuthGuard]},
  {path: 'faturaode', component: PayingBillsComponent, canActivate: [AuthGuard]},
  {path: 'kreditahmini', component: CreditEstimateComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
