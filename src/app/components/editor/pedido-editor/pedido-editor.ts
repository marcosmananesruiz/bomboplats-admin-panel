import { Plato } from './../../../api/model/plato';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Pedido, PedidoControllerService, User } from '../../../api';
import { FormsModule } from "@angular/forms";
import { UserSelector } from "../../selector/user-selector/user-selector";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";
import { ListSelector } from "../../util/list-selector/list-selector";

@Component({
  selector: 'app-pedido-editor',
  imports: [FormsModule, UserSelector, PlatoSelector, ListSelector],
  templateUrl: './pedido-editor.html',
  styleUrl: '../editor-style.css',
})
export class PedidoEditor implements OnInit {

  idsPedido: string[] = [];
  idSeleccionada: string = "";
  pedido: Pedido | null = null;

  user: User = {};
  plato: Plato = {};
  entrega: string = "";
  estado: Pedido.EstadoEnum = "PREPARING";
  modificaciones: string[] = [];

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoPedido: boolean = true;
  errorPedido: boolean = false

  constructor(
    @Inject(PedidoControllerService) private pedidoService: PedidoControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pedidoService.getPedidosIDs().subscribe({
      next: (data) => {
        this.idsPedido = data;
        this.cargandoTodos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err)
        this.cargandoTodos = false;
        this.errorTodos = true;
        this.cdr.detectChanges();
      }
    })
  }

  cargarPedido(): void {
    this.pedidoService.getPedidoById(this.idSeleccionada).subscribe(
      {
        next: (data) => {
          this.pedido = data;
          this.cargandoPedido = false;
          this.cargarDatosPedido();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err)
          this.errorPedido = true;
          this.cargandoPedido = false;
          this.cdr.detectChanges();
        }
      }
    )
  }

  cargarDatosPedido(): void {
    this.user = this.pedido?.user || {}
    this.plato = this.pedido?.plato || {}
    console.log(this.pedido?.entrega)
    this.entrega = this.pedido?.entrega?.slice(0, 16) || ""
    console.log(this.pedido?.entrega?.slice(0,16))
    this.estado = this.pedido?.estado || "PREPARING";
    this.modificaciones = this.pedido?.modifications || [];
    this.cdr.detectChanges();
  }

  update(): void {
    this.pedidoService.updatePedido({
      id: this.pedido?.id,
      user: this.user,
      plato: this.plato,
      entrega: this.entrega + ":00",
      estado: this.estado,
      modifications: this.modificaciones
    }).subscribe({
      next: (data) => {
        if (data) {
          alert("Se han actualizado los datos del pedido")
        } else {
          alert("No se ha podido actualizar los datos del pedido")
        }
      }
    })
  }

  cambiarUser(user: User): void {
    this.user = user;
    this.cdr.detectChanges();
  }

  cambiarPlato(plato: Plato): void {
    this.plato = plato;
    this.cdr.detectChanges();
  }

  agregarModificacion(modif: string) {
    if (this.modificaciones.find(m => m === modif)) {
      alert("Esa modificacion ya esta añadida!")
    } else {
      this.modificaciones.push(modif)
      this.cdr.detectChanges();
    }
  }

  eliminarModificacion(index: number): void {
    this.modificaciones.splice(index, 1)
    this.cdr.detectChanges()
  }

  delete() {
    const borrar = confirm("¿Estas seguro de querer borrar este pedido?")

    if (borrar) {
      if (this.pedido && this.pedido.id) {
        this.pedidoService.deletePedido(this.pedido.id).subscribe({
          next: (data) => {
            if (data) {
              alert("Se ha borrado el pedido exitosamente")
              this.clearFromList(this.pedido?.id || "")
              this.pedido = null;
              this.cdr.detectChanges();
            } else {
              alert("No se ha podido borrar el pedido")
            }
          },
          error: (err) => {
            console.error(err)
            alert("Se ha producido un error borrando el pedido")
          }
        })
      }
    }
  }

  clearFromList(pedidoId: string) {
    const index = this.idsPedido.indexOf(this.idsPedido.find(p => p === pedidoId) || "")
    if (index !== -1) {
      this.idsPedido.splice(index, 1)
    }
  }
}
