import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/login"])
    }
  }
}
