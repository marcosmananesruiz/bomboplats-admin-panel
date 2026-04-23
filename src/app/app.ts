import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'bomboplats-admin-panel';

  constructor(private router: Router) {}

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
}
