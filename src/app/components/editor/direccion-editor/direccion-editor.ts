import { DataFormat } from './../../../api/param';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Direccion, DireccionControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-direccion-editor',
  imports: [FormsModule],
  templateUrl: './direccion-editor.html',
  styleUrl: '../editor-style.css',
})
export class DireccionEditor implements OnInit {

  direccionIds: string[] = [];
  idSeleccionado: string = "";
  direccion: Direccion | null = null;

  poblacion: string = "";
  calle: string = "";
  codigoPostal: string = "";
  portal: number = 0;
  piso: string = "";

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoDireccion: boolean = false;
  errorDireccion: boolean = false;

  constructor(
    @Inject(DireccionControllerService) private direccionService: DireccionControllerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.direccionService.getDireccionIDs().subscribe({
      next: (data) => {
        this.direccionIds = data;
      },
      error: (err) => {
        console.error(err)
        this.errorTodos = true;
        this.cargandoTodos = true;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cargandoTodos = false;
        this.cdr.detectChanges();
      }
    })
  }

  cargarDireccion(): void {
    this.cargandoDireccion = true;
    this.direccionService.getDireccionById(this.idSeleccionado).subscribe({
      next: (data) => {
        this.direccion = data;
        this.cargandoDireccion = false;
        this.cargarDatosDireccion();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err)
        this.cargandoDireccion = false;
        this.errorDireccion = true;
        this.cdr.detectChanges();
      }
    })
  }

  cargarDatosDireccion(): void  {
    this.poblacion = this.direccion?.poblacion || "";
    this.calle = this.direccion?.calle || "";
    this.codigoPostal = this.direccion?.codigoPostal || "";
    this.portal = this.direccion?.portal || 0;
    this.piso = this.direccion?.piso || "";
  }

  update(): void {
    this.direccionService.updateDireccion({
      id: this.direccion?.id,
      poblacion: this.poblacion,
      calle: this.calle,
      codigoPostal: this.codigoPostal,
      portal: this.portal,
      piso: this.piso
    }).subscribe({
      next: (data) => {
        if (data) {
          alert("Se han actualizado los datos de la direccion")
        } else {
          alert("No se han podido actualizar los datos de la direccion")
        }
      },
      error: (err) => {
        console.error(err);
        alert("Se ha producido un error actualizando los datos de la direccion")
      }
    })
  }

  delete() {
    const borrar = confirm("¿Estas seguro de querer borrar esta direccion?")

    if (borrar) {
      if (this.direccion && this.direccion.id) {
        const id = this.direccion.id;
        this.direccionService.deleteById(id).subscribe(
          {
            next: (data) => {
              if (data) {
                alert("Se ha borrado la direccion exitosamente")
                this.clearFromList(this.direccion?.id || "")
                this.direccion = null;
                this.cdr.detectChanges();
              } else {
                alert("No se ha podido borrar la direccion")
              }
            },
            error: (err) => {
              console.error(err)
              alert("Se ha producido un error borrando la direccion")
            }
          }
        )
      }
    }
  }

  clearFromList(direccionId: string) {
    const index = this.direccionIds.indexOf(this.direccionIds.find(d => d === direccionId) || "")
    if (index !== -1) {
      this.direccionIds.splice(index, 1)
    }
  }
}
