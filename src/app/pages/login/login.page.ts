import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user={
    "email": "",
    "password": ""
  }
  constructor(private auth: AuthService ,private router: Router) { }

  ngOnInit() {
  }
  Login(){
    this.auth.Login(this.user.email, this.user.password);
  }
}
