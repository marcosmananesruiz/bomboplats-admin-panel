import { OpenApiHttpParams } from './../../../api/query.params';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Plato, PlatoControllerService, Restaurante, RestauranteControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageInput } from "../../util/image-input/image-input";

@Component({
  selector: 'app-plato-adder',
  imports: [FormsModule, StringInput, ImageInput],
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

  plato?: Plato

  icon?: File

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService,
    @Inject(PlatoControllerService) private platoService: PlatoControllerService,
    private http: HttpClient,
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
        error: (err) => this.onError(err),
        complete: () => {
          this.guardarFoto();
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

  cambiarIcono(icono: File) {
    this.icon = icono
  }

  reiniciarIcono() {
    this.icon = undefined
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

    let modificacionesCorrectas = true;

    let precioCorrecto = this.precio > 0;

    return nombreCorrecto && descripcionCorrecta && tagsCorrectas && modificacionesCorrectas && precioCorrecto;
  }

  guardarFoto() {
    if (this.icon && this.plato && this.plato.id) {

      this.platoService.getPlatoIconUploadUrl(this.plato.id).subscribe({
        next: (presignedUrl) => {
          if (this.icon) {
            const header = new HttpHeaders({
              'Content-Type': this.icon?.type
            })

            this.http.put(presignedUrl, this.icon, {"headers": header}).subscribe({
              complete: () => {
                if (this.plato && this.plato.id) { // Se que esta dos veces esto, pero TS es gilipollas y se queja

                  const iconUrl = this.url(this.plato.id)
                  this.plato.iconUrl = iconUrl;
                  this.platoService.updatePlato(this.plato).subscribe({
                    complete: () => console.log("Se ha guardado la foto del plato"),
                    error: (err) => this.onError(err)
                  })

                }
              },
              error: (err) => this.onError(err)
            })

          }
        },
        error: (err) => this.onError(err)
      })
    }
  }

  onError(err: any) {
    console.error(err)
    alert("Se ha producido un error guardando el plato")
  }

  url(id: string) {
    return "platos/" + id + ".jpg"
  }
}
