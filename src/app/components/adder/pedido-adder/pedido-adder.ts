import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Pedido, PedidoControllerService, Plato, PlatoControllerService, User, UserControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { UserSelector } from "../../selector/user-selector/user-selector";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";
import { StringInput } from "../../util/string-input/string-input";

@Component({
  selector: 'app-pedido-adder',
  imports: [FormsModule, UserSelector, PlatoSelector, StringInput],
  templateUrl: './pedido-adder.html',
  styleUrl: '../adders-style.css',
})
export class PedidoAdder {

  user: User = {}
  plato: Plato = {};
  estado: Pedido.EstadoEnum = "PREPARING"
  entrega: string = "";
  modificaciones: string[] = [];

  constructor(
    @Inject(PedidoControllerService) private pedidoService: PedidoControllerService,
  ) {}

  registerPedido(): void {
    const body = {
      user: this.user,
      plato: this.plato,
      estado: this.estado,
      modifications: this.modificaciones,
      entrega: this.entrega + ':00.000Z'
    }
    this.pedidoService.register2(body).subscribe({
      error: (err) => {
        console.error(err)
        alert("Se ha producido un error registrando el Pedido")
      },
      complete: () => {
        alert("Se ha registrado el pedido")
      }
    })
  }

  establecerUsuario(user: User) {
    this.user = user;
  }

  establecerPlato(plato: Plato) {
    this.plato = plato;
  }

  agregarModificacion(modif: string) {
    this.modificaciones.push(modif)
  }

  eliminarModificacion(index: number) {
    this.modificaciones.splice(index, 1)
  }
}
