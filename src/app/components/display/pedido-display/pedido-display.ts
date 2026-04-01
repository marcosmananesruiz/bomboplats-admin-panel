import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Pedido, PedidoControllerService } from '../../../api';
import { ElementDisplay } from '../element-display/element-display';

@Component({
  selector: 'app-pedido-display',
  imports: [],
  templateUrl: './pedido-display.html',
  styleUrl: './pedido-display.css',
})
export class PedidoDisplay extends ElementDisplay implements OnInit {

  pedidos: Pedido[] = []

  constructor(
    @Inject(PedidoControllerService) private pedidoService: PedidoControllerService,
    private cdr: ChangeDetectorRef
  ) { super() }

  ngOnInit(): void {
    this.pedidoService.findAll3().subscribe(
      {
        next: (data) => {
          this.pedidos = data;
        },
        error: (err) => {
          console.error(err)
          this.error = true;
          this.cargando = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.cargando = false;
          if (this.pedidos.length === 0) {
            this.empty = true;
          }
          this.cdr.detectChanges();
        }
      }
    )
  }
}
