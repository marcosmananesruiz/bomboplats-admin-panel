import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoDisplay } from "../display/pedido-display/pedido-display";
import { UserDisplay } from '../display/user-display/user-display';
import { DireccionDisplay } from '../display/direccion-display/direccion-display';
import { RestauranteDisplay } from '../display/restaurante-display/restaurante-display';
import { PlatoDisplay } from '../display/plato-display/plato-display';
import { AuthService } from '../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-container',
  imports: [FormsModule, PedidoDisplay, UserDisplay, DireccionDisplay, PlatoDisplay, RestauranteDisplay],
  templateUrl: './display-container.html',
  styleUrl: './display-container.css',
})
export class DisplayContainer implements OnInit {

  entitySelected: string = ""

  constructor(
    private auth: AuthService,
    private router: Router
  )
  {}


  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/unauthorized"])
    }
  }
}
