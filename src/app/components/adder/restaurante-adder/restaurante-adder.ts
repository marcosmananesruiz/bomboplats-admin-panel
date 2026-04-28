import { S3Service, URLType } from './../../../service/s3-service';
import { OpenApiHttpParams } from './../../../api/query.params';
import { Component, Inject } from '@angular/core';
import { Direccion, Plato, Restaurante, RestauranteControllerService } from '../../../api';
import { PlatoSelector } from '../../selector/plato-selector/plato-selector';
import { DireccionSelector } from '../../selector/direccion-selector/direccion-selector';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageInput } from "../../util/image-input/image-input";

@Component({
  selector: 'app-restaurante-adder',
  imports: [DireccionSelector, FormsModule, StringInput, ImageInput],
  templateUrl: './restaurante-adder.html',
  styleUrl: '../adders-style.css',
})
export class RestauranteAdder {

  nombre: string = "";
  descipcion: string = "";
  tags: string[] = [];
  iconUrls: string[] = [];
  rating: number = 0;
  platos: Set<Plato> = new Set();
  direcciones: Direccion[] = [];

  icons : File[] = []
  restaurante? : Restaurante

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService,
    private s3Service: S3Service,
    private http: HttpClient
  ) { }


  agregarDireccion(direccion: Direccion): void {
    if (!this.direcciones.find(d => d.id === direccion.id)) {
      this.direcciones.push(direccion)
    } else {
      alert("Esa direccion ya esta añadida al restaurante")
    }
  }

  eliminarDireccion(index: number) {
    this.direcciones.splice(index, 1)
  }

  agregarIcono(icon: File) {
    this.icons.push(icon)
  }

  eliminarIcono(index: number) {
    this.icons.splice(index, 1)
  }

  agregarTag(tag: string) {
    this.tags.push(tag)
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1)
  }

  registerRestaurante(): void {

    if (this.icons.length > 0) {
      if (this.restaurante && this.restaurante.id) {

        const id = this.restaurante.id

        for (let i = 0; i < this.icons.length; i++) {

          const icon = this.icons.at(i)

          this.restauranteService.getRestauranteIconUploadUrl(id, 0).subscribe({
            next: (presignedUrl) => {
              if (icon) {
                this.s3Service.saveImage(presignedUrl, icon)
              }
            },
            complete: () => {
              const url = this.s3Service.url(URLType.REST, id, i)
              this.iconUrls.push(url)
              this.registrarRestaurante()
            }
          })
        }
      }
    } else {
      this.iconUrls = [this.s3Service.DEFAULT_RESTAURANTE_PIC]
      this.registrarRestaurante();
    }

  }

  registrarRestaurante() {
    this.restauranteService.register({
      nombre: this.nombre,
      description: this.descipcion,
      tags: this.tags,
      iconUrls: this.iconUrls,
      rating: this.rating,
      platos: [...this.platos] as unknown as Set<Plato>,
      direcciones: this.direcciones
    }).subscribe({
      next: (data) => {
        this.restaurante = data
      },
      error: (err) => this.onError(err),
      complete: () => {
        alert("Se ha registrado el restaurante!")
      }
    })
  }

  onError(err: any) {
    console.error(err)
    alert("Se ha producido un error registrando el restaurante")
  }
}
