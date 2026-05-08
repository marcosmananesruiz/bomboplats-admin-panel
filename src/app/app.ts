import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth-service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'bomboplats-admin-panel';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  mostrarElementDisplay(): void {
    this.router.navigate(['/display']);
  }

  mostrarElementAdder(): void {
    this.router.navigate(['/adder']);
  }

  mostrarElementEditor(): void {
    this.router.navigate(['/editor']);
  }

  reiniciarPagina(): void {
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.auth.isLogged();
  }

  logout() {
    this.auth.revokeAccess();
    this.router.navigate(["/login"])
  }
}
