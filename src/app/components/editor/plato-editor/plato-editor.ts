import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Plato, PlatoControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { StringInput } from "../../util/string-input/string-input";
import { S3Service, URLType } from '../../../service/s3-service';
import { ImageInput } from '../../util/image-input/image-input';

@Component({
  selector: 'app-plato-editor',
  imports: [FormsModule, StringInput, ImageInput],
  templateUrl: './plato-editor.html',
  styleUrl: '../editor-style.css',
})
export class PlatoEditor implements OnInit {

  plato: Plato | null = null;
  platoIds: (string | undefined)[] = [];
  idSelected: string = "";

  nombre: string = "";
  description: string = "";
  iconUrl: string = "";
  tags: Array<string> = [];
  possibleModifications: Array<string> = [];
  precio: number = 0;

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoPlato: boolean = false;
  errorPlato: boolean = false;

  cachedIcon? : File

  constructor(
    @Inject(PlatoControllerService) private platoService: PlatoControllerService,
    private s3Service: S3Service,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.platoService.findAll2().subscribe(
      {
        next: (data) => {
          this.platoIds = data.map(p => p.id)
          this.cargandoTodos = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err)
          this.cargandoTodos = false;
          this.errorTodos = true;
          this.cdr.detectChanges();
        }
      }
    )
  }


  cargarPlato() {
    this.cargandoPlato = true;
    this.platoService.getPlatoById(this.idSelected).subscribe(
      {
        next: (data) => {
          this.plato = data;
          this.cargandoPlato = false;
          this.cargarDatosPlato();
        },
        error: (err) => {
          console.error(err)
          this.cargandoPlato = false;
          this.errorPlato = true;
          this.cdr.detectChanges();
        }
      }
    )
  }

  cargarDatosPlato() {
    this.nombre = this.plato?.nombre || ""
    this.description = this.plato?.description || ""
    this.iconUrl = this.plato?.iconUrl || ""
    this.tags = this.plato?.tags || []
    this.possibleModifications = this.plato?.possibleModifications || []
    this.precio = this.plato?.precio || 0
    this.cdr.detectChanges();
  }

  update() {

    if (this.cachedIcon && this.plato && this.plato.id) {
      const id = this.plato.id
      const icon = this.cachedIcon
      this.platoService.getPlatoIconUploadUrl(id).subscribe({
        next: (presignedUrl) => {
          this.s3Service.saveImage(presignedUrl, icon)
          const url = this.s3Service.url(URLType.PLATO, id)
          this.iconUrl = url;
        },
        error: (err) => {
          console.error(err)
          alert("Se ha producido un error para guardar la foto!")
        }
      })
    }

    this.platoService.updatePlato({
      id: this.plato?.id,
      nombre: this.nombre,
      description: this.description,
      iconUrl: this.iconUrl,
      tags: this.tags,
      possibleModifications: this.possibleModifications,
      precio: this.precio
    }).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Se han actualizado los datos del Plato")
          } else {
            alert("No se han podido actualizar los datos")
          }
        },
        error: (err) => {
          console.error(err);
          alert("Se ha producido un error guardando los datos")
        }
      }
    )
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

  delete() {
    const borrar = confirm("¿Estas seguro de querer borrar este plato? (¡Se borrarán tambien todos los pedidos asociados a el!)")

    if (borrar) {
      if (this.plato && this.plato.id) {
        this.platoService.deletePlato(this.plato.id).subscribe({
          next: (data) => {
            if (data) {
              alert("Se ha borrado exitosamente el plato")
              this.clearFromList(this.plato?.id || "")
              this.plato = null;
              this.cdr.detectChanges();
            } else {
              alert("No se ha podido borrar el plato")
            }
          },
          error: (err) => {
            console.error(err)
            alert("Se ha producido un error borrando el plato")
          }
        })
      }
    }
  }

  clearFromList(platoId: string) {
    const index = this.platoIds.indexOf(this.platoIds.find(p => p === platoId || ""))
    if (index !== -1) {
      this.platoIds.splice(index, 1)
    }
  }

  resetIcon() {
    this.iconUrl = this.s3Service.DEAFULT_PLATO_PIC
  }

  showIcon() {
    window.open(this.s3Service.getFullImageUrl(this.iconUrl), "_blank")
  }

  clearCachePic() {
    this.cachedIcon = undefined;
  }

  showCachedIcon() {
    if (this.cachedIcon) {
      window.open(URL.createObjectURL(this.cachedIcon), "_blank")
    }
  }

  cachePic(image: File) {
    this.cachedIcon = image
  }
}
