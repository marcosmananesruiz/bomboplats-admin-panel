import { Component, Inject, OnInit } from '@angular/core';
import { Pedido, PedidoControllerService, Plato, User } from '../../../api';
import { FormsModule } from "@angular/forms";
import { UserSelector } from "../../selector/user-selector/user-selector";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";
import { ListSelector } from "../../util/list-selector/list-selector";
import { AuthService } from '../../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-adder',
  imports: [FormsModule, UserSelector, PlatoSelector, ListSelector],
  templateUrl: './pedido-adder.html',
  styleUrl: '../adders-style.css',
})
export class PedidoAdder implements OnInit {

  user: User = {}
  plato: Plato = {};
  estado: Pedido.EstadoEnum = "PREPARING"
  entrega: string = "";
  modificaciones: string[] = [];

  constructor(
    @Inject(PedidoControllerService) private pedidoService: PedidoControllerService,
    private auth: AuthService,
    private router: Router
  ) {}

    ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/login"])
    }
  }

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
    this.modificaciones = []
  }

  agregarModificacion(modif: string) {
    if (this.modificaciones.find(m => m === modif)) {
      alert("Esa modificacion ya esta añadida")
    } else {
      this.modificaciones.push(modif)
    }
  }

  eliminarModificacion(index: number) {
    this.modificaciones.splice(index, 1)
  }
}
