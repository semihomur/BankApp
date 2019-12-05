import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  maxDate: Date ;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dateAdapter: DateAdapter<any>,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.dateAdapter.setLocale('tr');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 365.25 * 18);
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20), Validators.pattern(/^[a-zA-z-ğüşöıçİĞÜŞÖÇ]+$/)]],
      lastName: [null, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20), Validators.pattern(/^[a-zA-z-ğüşöıçİĞÜŞÖÇ]+$/)]],
      TCKNo: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9\b]+$/)]],
      DateofBirth: [null, [Validators.required]],
      PhoneNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9\b]+$/)]],
      // tslint:disable-next-line:max-line-length
      Email: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      Password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
      });
  }
    onSubmit() {
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.alertify.success('Başarıyla yeni kayıt oluşturuldu');
        this.router.navigate(['']);
      }, (error) => {
          this.alertify.error('Yeni kayıt oluşturulamadı, bilgilerinizin doğruluğuna ve böyle bir TC Kimlik Numarasına ait kayıt olmadığına emin olunuz.');
      });
    }
}
