import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ElementDisplay } from '../element-display/element-display';
import { Restaurante, RestauranteControllerService } from '../../../api';

@Component({
  selector: 'app-restaurante-display',
  imports: [],
  templateUrl: './restaurante-display.html',
  styleUrl: './restaurante-display.css',
})
export class RestauranteDisplay extends ElementDisplay implements OnInit {

  restaurantes: Restaurante[] = [];

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService,
    private cdr: ChangeDetectorRef
  ) { super() }

  ngOnInit(): void {
    this.restauranteService.findAll1().subscribe(
      {
        next: (data) => {
          this.restaurantes = data;
        },
        error: (err) => {
          console.error(err);
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
}
