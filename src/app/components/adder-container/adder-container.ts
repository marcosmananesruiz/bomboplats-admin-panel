import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAdder } from "../adder/user-adder/user-adder";
import { DireccionAdder } from "../adder/direccion-adder/direccion-adder";
import { PedidoAdder } from "../adder/pedido-adder/pedido-adder";
import { PlatoAdder } from "../adder/plato-adder/plato-adder";
import { RestauranteAdder } from "../adder/restaurante-adder/restaurante-adder";

@Component({
  selector: 'app-adder-container',
  imports: [FormsModule, UserAdder, DireccionAdder, PedidoAdder, PlatoAdder, RestauranteAdder],
  templateUrl: './adder-container.html',
  styleUrl: './adder-container.css',
})
export class AdderContainer {
  entitySelected: string = "";
}
