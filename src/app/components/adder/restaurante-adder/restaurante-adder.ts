import { Component, Inject } from '@angular/core';
import { Direccion, Plato, RestauranteControllerService } from '../../../api';
import { PlatoSelector } from '../../selector/plato-selector/plato-selector';
import { DireccionSelector } from '../../selector/direccion-selector/direccion-selector';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";

@Component({
  selector: 'app-restaurante-adder',
  imports: [PlatoSelector, DireccionSelector, FormsModule, StringInput],
  templateUrl: './restaurante-adder.html',
  styleUrl: '../adders-style.css',
})
export class RestauranteAdder {

  nombre: string = "";
  descipcion: string = "";
  tags: string[] = [];
  iconUrls: string[] = [];
  rating: number = 0;
  platos: Set<Plato> = new Set<Plato>;
  direcciones: Direccion[] = [];

  constructor(
    @Inject(RestauranteControllerService) private restauranteService: RestauranteControllerService
  ) { }

  agregarPlato(plato: Plato): void {
    const yaExiste = [...this.platos].some(p => p.id === plato.id)
    if (!yaExiste) {
      this.platos.add(plato)
    } else {
      alert("Ese plato ya esta añadido al restaurante")
    }
  }

  agregarDireccion(direccion: Direccion): void {
    if (!this.direcciones.find(d => d.id === direccion.id)) {
      this.direcciones.push(direccion)
    } else {
      alert("Esa direccion ya esta añadida al restaurante")
    }
  }

  eliminiarPlato(plato: Plato) {
    this.platos.delete(plato)
  }

  eliminarDireccion(index: number) {
    this.direcciones.splice(index, 1)
  }

  agregarTag(tag: string) {
    this.tags.push(tag)
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1)
  }

  agregarIconUrl(iconUrl: string) {
    this.iconUrls.push(iconUrl)
  }

  eliminarIconUrl(index: number) {
    this.iconUrls.splice(index, 1)
  }

  registerRestaurante(): void {
    this.restauranteService.register({
      nombre: this.nombre,
      description: this.descipcion,
      tags: this.tags,
      iconUrls: this.iconUrls,
      rating: this.rating,
      platos: [...this.platos] as unknown as Set<Direccion>,
      direcciones: this.direcciones
    }).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error(err)
        alert("Se ha producido un error registrando el restaurante")
      },
      complete: () => {
        alert("Se ha registrado el restaurante!")
      }
    })
  }
}
