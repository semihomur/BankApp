import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      'tckno': [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9\b]+$/)]],
      // tslint:disable-next-line:object-literal-key-quotes
      'password': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  });
}
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.router.navigate(['hesaplarim']);
      this.alertify.success('Başarılı bir şekilde giriş yapıldı')
    }, () => this.alertify.error('Giriş yapılırken hata oluştu'));
  }
}
