import { Plato } from './../../../api/model/plato';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ElementDisplay } from '../element-display/element-display';
import { PlatoControllerService } from '../../../api';

@Component({
  selector: 'app-plato-display',
  imports: [],
  templateUrl: './plato-display.html',
  styleUrl: './plato-display.css',
})
export class PlatoDisplay extends ElementDisplay implements OnInit {

  platos: Plato[] = [];

  constructor(
    @Inject(PlatoControllerService) private platoService: PlatoControllerService,
    private cdr: ChangeDetectorRef
  ) { super() }

  ngOnInit(): void {
    this.platoService.findAll2().subscribe({
      next: (data) => {
        this.platos = data;
      },
      error: (err) => {
        console.error(err)
        this.error = true;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cargando = false;
        this.cdr.detectChanges();
        if (this.platos.length === 0) {
          this.empty = true;
        }
      }
    })
  }

}
