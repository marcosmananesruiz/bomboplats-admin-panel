import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Plato, PlatoControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-plato-selector',
  imports: [FormsModule],
  templateUrl: './plato-selector.html',
  styleUrl: './plato-selector.css',
})
export class PlatoSelector implements OnInit {

  @Input() actionText: string = "Añadir"
  @Output() platoAñadido = new EventEmitter<Plato>();

  platos: Plato[] = []
  platoSeleccionado: Plato | null = null;

  cargando: boolean = true;
  error: boolean = false;
  constructor(
    @Inject(PlatoControllerService) private platoService: PlatoControllerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.platoService.findAll2().subscribe(
      {
        next: data => this.platos = data,
        error: err => {
          console.error(err)
          alert("Se ha producido un error en la carga de datos")
          this.error = true;
          this.cargando = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        }
      }
    )
  }

  add(): void {
    if (this.platoSeleccionado) {
      this.platoAñadido.emit(this.platoSeleccionado)
    } else {
      alert("Seleccione un plato para añadir")
    }
  }
}
