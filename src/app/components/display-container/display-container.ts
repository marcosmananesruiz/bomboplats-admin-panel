import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoDisplay } from "../display/pedido-display/pedido-display";
import { UserDisplay } from '../display/user-display/user-display';
import { DireccionDisplay } from '../display/direccion-display/direccion-display';
import { RestauranteDisplay } from '../display/restaurante-display/restaurante-display';
import { PlatoDisplay } from '../display/plato-display/plato-display';

@Component({
  selector: 'app-display-container',
  imports: [FormsModule, PedidoDisplay, UserDisplay, DireccionDisplay, PlatoDisplay, RestauranteDisplay],
  templateUrl: './display-container.html',
  styleUrl: './display-container.css',
})
export class DisplayContainer {

  entitySelected: string = ""

}
