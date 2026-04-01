import { FormsModule } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Direccion, DireccionControllerService } from '../../../api';

@Component({
  selector: 'app-direccion-adder',
  imports: [FormsModule],
  templateUrl: './direccion-adder.html',
  styleUrl: '../adders-style.css',
})
export class DireccionAdder {
  poblacion: string = "";
  codigoPostal: string = "";
  calle: string = "";
  portal: number = 0;
  piso: string = "";

  constructor(
    @Inject(DireccionControllerService) private direccionService: DireccionControllerService
  ) { }

  registrarDireccion(): void {
    if (this.verificarDatos()) {
      const direccion: Direccion = {
        poblacion: this.poblacion,
        codigoPostal: this.codigoPostal,
        calle: this.calle,
        portal: this.portal,
        piso: this.piso
      }

      this.direccionService.registerDireccion(direccion).subscribe(
        {
          next: function (success) {
            if (success) {
              alert("Se ha registrado la direccion correctamente")
            } else {
              alert("No se ha podido registrar la direccion")
            }
          },
          error: function (err) {
            alert("Se ha producido un error con el servidor! Mira la consola del navegador")
            console.error(err)
          }
        }
      )
    }
  }

  verificarDatos(): boolean {
    let poblacionCorrecto = this.poblacion.length <= 24;
    let codigoPostalCorrecto = this.codigoPostal.length <= 5 && this.esNumero(this.codigoPostal);
    let calleCorrecto = this.calle.length <= 32;
    let portalCorrecto = this.portal > 0;
    let pisoCorrecto = this.piso.length <= 8

    return poblacionCorrecto && codigoPostalCorrecto && calleCorrecto && portalCorrecto && pisoCorrecto
  }

  esNumero(valor: string): boolean {
    return valor.trim() !== '' && !isNaN(Number(valor))
  }
}
