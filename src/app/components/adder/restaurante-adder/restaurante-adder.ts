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
        this.guardarFotos()
        alert("Se ha registrado el restaurante!")
      }
    })
  }

  guardarFotos() {
    if (this.icons && this.restaurante && this.restaurante.id) {
      for (let i = 0; i < this.icons.length; i++) {
        let icon = this.icons[i]

        if (!icon) {
          continue
        }

        let uploadUrl : string;
        this.restauranteService.getRestauranteIconUploadUrl(this.restaurante.id, i).subscribe({
          next: (data) => {
            uploadUrl = data
          },
          error: (err) => this.onError(err),
          complete: () => {
            if (uploadUrl && icon) this.registerFoto(icon, uploadUrl, i)
          }
        })
      }
    }
  }

  registerFoto(icon: File, uploadUrl: string, index: number) {

    const header = new HttpHeaders({
      'Content-Type': icon.type
    })

    this.http.put(uploadUrl, icon).subscribe({
      error: (err) => this.onError(err),
      complete: () => {
        console.log("Foto de restaurante guardado: " + uploadUrl)
        if (this.restaurante && this.restaurante.id) {

          let iconUrl : string = this.url(this.restaurante.id, index)

          this.restaurante.iconUrls?.push(iconUrl)
          
          this.restauranteService.updateRestaurante(this.restaurante).subscribe({
            error: (err) => this.onError(err),
            complete: () => console.log("Añadida foto al restaurante: " + iconUrl)
          })
        }
      }
    })
  }


  onError(err: any) {
    console.error(err)
    alert("Se ha producido un error registrando el restaurante")
  }

  url(id: string, index: number): string {
    return "restaurantes/" + id + "/" + index + ".jpg"
  }
}
