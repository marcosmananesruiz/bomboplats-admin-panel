import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Direccion, DireccionControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-direccion-selector',
  imports: [FormsModule],
  templateUrl: './direccion-selector.html',
  styleUrl: './direccion-selector.css',
})
export class DireccionSelector implements OnInit {

  @Input() actionText: string = "Añadir"
  @Output() direccionAñadida = new EventEmitter<Direccion>();

  direcciones: Direccion[] = [];
  direccionSeleccionada: Direccion | null = null;

  cargando: boolean = true;
  error: boolean = false;
  constructor(
    @Inject(DireccionControllerService) private direccionService: DireccionControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.direccionService.findAll4().subscribe(
      {
        next: (data) => this.direcciones = data,
        error: (err) => {
          console.error(err);
          alert("Se ha producido un error con la carga de Direcciones")
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
    if (this.direccionSeleccionada) {
      this.direccionAñadida.emit(this.direccionSeleccionada)
    } else {
      alert("Seleccione una direccion para añadir")
    }
  }

}
