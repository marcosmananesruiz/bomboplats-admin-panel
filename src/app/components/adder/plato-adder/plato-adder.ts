import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PlatoControllerService, Restaurante, RestauranteControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";

@Component({
  selector: 'app-plato-adder',
  imports: [FormsModule, StringInput],
  templateUrl: './plato-adder.html',
  styleUrl: '../adders-style.css',
})
export class PlatoAdder implements OnInit {

  restauranteId: string = "";
  nombre: string = "";
  descripcion: string = "";
  iconUrl: string = "";
  tags: string[] = [];
  possibleModifications: string[] = [];
  precio: number = 0;

  restaurantes: Restaurante[] = [];
  errorRestaurantes: boolean = false;
  cargandoRestaurantes: boolean = true;

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService,
    private cdr: ChangeDetectorRef
  ) { }

ngOnInit(): void {
  this.restauranteService.findAll1().subscribe({
    next: (data) => {
      this.restaurantes = data;
    },
    error: (err) => {
      console.error(err)
      this.errorRestaurantes = true;
      this.cargandoRestaurantes = false;
      this.cdr.detectChanges();
    },
    complete: () => {
      this.cargandoRestaurantes = false;
      this.cdr.detectChanges();
    }
  })
}

  registerPlato(): void {
    if (this.verificarDatos()) {
      this.restauranteService.registerPlato(this.restauranteId, {
        nombre: this.nombre,
        description: this.descripcion,
        tags: this.tags,
        iconUrl: this.iconUrl,
        possibleModifications: this.possibleModifications,
        precio: this.precio
      }).subscribe({
        next: (data) => {
          console.log("Se ha registrado el plato!")
        },
        error: (err) => {
          console.error(err);
          alert("Se ha producido un problema registrando el plato")
        },
        complete: () => {
          alert("Se ha registrado el plato correctamente")
        }
      })
    } else {
      alert("Los datos son incorrectos!")
    }
  }

  agregarModificacion(modif: string) {
    this.possibleModifications.push(modif)
  }

  eliminarModificacion(index: number) {
    this.possibleModifications.splice(index, 1)
  }

  agregarTag(tag: string) {
    this.tags.push(tag)
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1)
  }

  verificarDatos(): boolean {
    let nombreCorrecto = this.nombre.length <= 32;
    let descripcionCorrecta = this.descripcion.length <= 128
    let tagsCorrectas = true;

    let iconUrlCorrecto = this.iconUrl.length <= 255;
    let modificacionesCorrectas = true;

    let precioCorrecto = this.precio > 0;

    return nombreCorrecto && descripcionCorrecta && tagsCorrectas && iconUrlCorrecto && modificacionesCorrectas && precioCorrecto;
  }
}
