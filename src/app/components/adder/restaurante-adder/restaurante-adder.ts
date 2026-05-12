import { Restaurante } from './../../../api/model/restaurante';
import { S3Service, URLType } from '../../../service/s3-service/s3-service';
import { Component, Inject, OnInit } from '@angular/core';
import { Direccion, Plato, RestauranteControllerService } from '../../../api';
import { DireccionSelector } from '../../selector/direccion-selector/direccion-selector';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";
import { ImageInput } from "../../util/image-input/image-input";
import { AuthService } from '../../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurante-adder',
  imports: [DireccionSelector, FormsModule, StringInput, ImageInput],
  templateUrl: './restaurante-adder.html',
  styleUrl: '../adders-style.css',
})
export class RestauranteAdder implements OnInit {

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
    private auth: AuthService,
    private router: Router,
    private s3Service: S3Service,
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/login"])
    }
  }

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
      iconUrls: [this.s3Service.DEFAULT_RESTAURANTE_PIC],
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
      }
    })
  }

  guardarFotos() {
    if (this.icons.length > 0) {
      if (this.restaurante && this.restaurante.id) {

        const id = this.restaurante.id

        for (let i = 0; i < this.icons.length; i++) {

          const icon = this.icons.at(i)

          this.restauranteService.getRestauranteIconUploadUrl(id, i).subscribe({
            next: (presignedUrl) => {
              if (icon) {
                this.s3Service.saveImage(presignedUrl, icon)
              }
            },
            complete: () => {
              const url = this.s3Service.url(URLType.REST, id, i)
              this.iconUrls.push(url)

              if (i === this.icons.length - 1) {

                this.restauranteService.updateRestaurante({
                  id: this.restaurante?.id,
                  nombre: this.restaurante?.nombre,
                  description: this.restaurante?.description,
                  iconUrls: this.iconUrls,
                  rating: this.restaurante?.rating,
                  direcciones: this.restaurante?.direcciones,
                  tags: this.restaurante?.tags,
                  platos: this.restaurante?.platos
                }).subscribe({
                  next: (data) => {
                    alert("Se ha guardado el restaurante")
                  },
                  error: (err) => { this.onError(err) }
                })
              }
            },
            error: (err) => this.onError(err)
          })
        }
      } else {
        console.error("no hay restaurantes aun")
      }
    } else {
      console.error("no hay fotos")
    }
  }

  onError(err: any) {
    console.error(err)
    alert("Se ha producido un error registrando el restaurante")
  }
}
