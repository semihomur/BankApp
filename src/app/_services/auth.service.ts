import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { FormGroup } from '@angular/forms';
import { RegisterUser } from '../_models/RegisterUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
constructor(private http: HttpClient) { }

login(loginForm: any) {
  return this.http.post(this.baseUrl + 'login', {tckno: loginForm.tckno , password: loginForm.password})
      .pipe(map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
        }
      }));
}
register(registerForm: RegisterUser) {
  return this.http.post(this.baseUrl + 'register', registerForm);
}
loggedIn() {
try {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
} catch {
  return false;
}
}

}
