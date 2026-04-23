import { Component, Inject, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Direccion, Plato, Restaurante, RestauranteControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";
import { DireccionSelector } from "../../selector/direccion-selector/direccion-selector";
import { S3Service, URLType } from '../../../service/s3-service';
import { ImageInput } from "../../util/image-input/image-input";

@Component({
  selector: 'app-restaurante-editor',
  imports: [FormsModule, StringInput, PlatoSelector, DireccionSelector, ImageInput],
  templateUrl: './restaurante-editor.html',
  styleUrl: '../editor-style.css',
})
export class RestauranteEditor implements OnInit {

  restaurante?: Restaurante;
  restaurantesId: (string | undefined)[] = [];
  idSelected: string = "";

  nombre: string = "";
  description: string = "";
  iconUrls: Array<string> = [];
  tags: Array<string> = [];
  platos: Set<Plato> = new Set();
  direcciones: Array<Direccion> = [];
  rating: number = 0;

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoRestaurante: boolean = false;
  errorRestaurante: boolean = false;

  cachedImages : File[] = []

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService,
    private s3Service: S3Service,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.restauranteService.findAll1().subscribe(
      {
        next: (data) => {
          this.restaurantesId = data.map(r => r.id) || []
          this.cargandoTodos = false;
          this.cargarRestaurante();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err)
          this.cargandoTodos = false;
          this.errorTodos = true;
          this.cdr.detectChanges();
        },
      }
    )
  }

  cargarRestaurante() {
    this.cargandoRestaurante = true;
    this.restauranteService.getRestauranteById(this.idSelected).subscribe(
      {
        next: (data) => {
          this.restaurante = data;
          this.cargandoRestaurante = false;
          this.cargarDatosRestaurante();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err)
          this.cargandoRestaurante = false;
          this.errorRestaurante = true;
          this.cdr.detectChanges();
        }
      }
    )
  }

  cargarDatosRestaurante() {
    this.nombre = this.restaurante?.nombre || "";
    this.description = this.restaurante?.description || "";
    this.iconUrls = this.restaurante?.iconUrls || [];
    this.tags = this.restaurante?.tags || [];
    this.platos = this.restaurante?.platos || new Set();
    this.direcciones = this.restaurante?.direcciones || [];
    this.rating = this.restaurante?.rating || 0
  }

  update(): void {

    this.guardarFotos();
    
    this.restauranteService.updateRestaurante({
      id: this.restaurante?.id,
      nombre: this.nombre,
      description: this.description,
      iconUrls: this.iconUrls,
      tags: this.tags,
      platos: [...this.platos] as unknown as Set<Plato>,
      direcciones: this.direcciones,
      rating: this.rating
    }).subscribe({
      next: (data) => {
        if (data) {
          alert("Se han actualizado los datos del restaurante")
        } else {
          alert("No se han podido actualizar los datos del restaurante")
        }
      },
      error: (err) => {
        console.error(err)
        alert("Se ha producido un error actualizando los datos")
      },
      complete: () => {}
    })
  }

  agregarTag(tag: string) {
    this.tags.push(tag)
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1)
  }

  agregarIcono(image: File) {
    this.cachedImages.push(image)
  }

  eliminarIconUrl(index: number) {
    if ((this.iconUrls.length - 1) <= 0) {
      alert("El Restaurante tiene que tener al menos una foto!")
    } else {
      this.iconUrls.splice(index, 1)
    }
  }

  agregarPlato(plato: Plato) {
    this.platos.add(plato)
  }

  eliminarPlato(plato: Plato) {
    this.platos.delete(plato)
  }

  agregarDireccion(direccion: Direccion) {
    this.direcciones.push(direccion);
  }

  eliminarDireccion(index: number) {
    this.direcciones.splice(index, 1)
  }

  delete() {
    const borrar = confirm("¿Estas seguro de querer borrar este restaurante? (¡Se eliminaran todos los PLATOS y DIRECCIONES asociados a el!)")

    if (borrar) {
      if (this.restaurante && this.restaurante.id) {
        this.restauranteService.deleteRestaurante(this.restaurante.id).subscribe({
          next: (data) => {
            if (data) {
              alert("Se ha borrado exitosamente el restaurante")
              this.clearFromList(this.restaurante?.id || "")
              this.restaurante = undefined;
              this.cdr.detectChanges();
            } else {
              alert("No se ha podido borrar el restaurante")
            }
          },
          error: (err) => {
            console.error(err);
            alert("Se ha producido un error borrando el restaurante")
          }
        })
      }
    }
  }

  clearFromList(restauranteId: string) {
    const index = this.restaurantesId.indexOf(this.restaurantesId.find(r => r === restauranteId || ""))
    if (index !== -1) {
      this.restaurantesId.splice(index, 1)
    }
  }

  showProfilePic(iconUrl: string) {
    window.open(this.s3Service.getFullImageUrl(iconUrl), "_blank")
  }

  guardarFotos() {
    if (this.cachedImages && this.restaurante && this.restaurante.id) {

      const id = this.restaurante.id;
      const iconsNumbe = this.iconUrls.length;

      for (let i = 0; i < this.cachedImages.length; i++) {

        const index = iconsNumbe + i;
        const iconUrl = this.s3Service.url(URLType.REST, id, index)

        this.restauranteService.getRestauranteIconUploadUrl(id, index).subscribe({
          next: (presignedUrl) => {
            const foto = this.cachedImages.at(i)
            this.s3Service.saveImage(presignedUrl, foto!)
            this.restaurante?.iconUrls?.push(iconUrl)
          }
        })
      }
    }
  }
}
