import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Direccion, DireccionControllerService } from '../../../api';
import { ElementDisplay } from '../element-display/element-display';

@Component({
  selector: 'app-direccion-display',
  imports: [],
  templateUrl: './direccion-display.html',
  styleUrl: './direccion-display.css',
})
export class DireccionDisplay extends ElementDisplay implements OnInit  {
  direcciones: Direccion[] = []
  constructor(
    @Inject(DireccionControllerService) private direccionService: DireccionControllerService,
    private cdr: ChangeDetectorRef
  ) { super(); }

  ngOnInit(): void {
    this.direccionService.findAll4().subscribe({
      next: (data) => {
        this.direcciones = data;
      },
      error: (err) => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cargando = false;
        this.cdr.detectChanges();
        if (this.direcciones.length === 0) {
          this.empty = true;
        }
      }
    })
  }

}
