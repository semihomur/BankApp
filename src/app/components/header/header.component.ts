import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  theme = true;
  constructor(private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'default-theme' || theme === null ) {
      this.DefaultTheme();
      this.theme = true;
    } else {
      this.DarkTheme();
      this.theme = false;
    }
  }
  DefaultTheme() {
    document.body.classList.add('default-theme');
    document.body.classList.remove('dark-theme');
  }
  DarkTheme() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('default-theme');
  }
  changeTheme() {
    this.theme = !this.theme;
    if (this.theme) {
      this.DefaultTheme();
    } else {
      this.DarkTheme();
    }
    localStorage.setItem('theme', this.theme ? 'default-theme' : 'dark-theme');
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.authService.decodedToken = undefined;
    this.alertify.message('Çıkış yapıldı');
  }

}
