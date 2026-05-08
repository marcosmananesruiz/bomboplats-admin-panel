import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth-service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  private readonly adminPassword = environment.adminPassword;

  introducedPasword: string = ""

  error: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.router.navigate([""])
    }
  }

  login() {
    if (this.adminPassword === this.introducedPasword) {
      this.auth.grantAccess();
      this.router.navigate([""])
    } else {
      this.introducedPasword = ""
      this.error = true;
    }
  }
}
