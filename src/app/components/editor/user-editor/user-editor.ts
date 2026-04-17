import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { Direccion, Plato, User, UserControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { DireccionSelector } from "../../selector/direccion-selector/direccion-selector";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";
import { S3Service, URLType } from '../../../service/s3-service';
import { ImageInput } from "../../util/image-input/image-input";

@Component({
  selector: 'app-user-editor',
  imports: [FormsModule, DireccionSelector, PlatoSelector, ImageInput],
  templateUrl: './user-editor.html',
  styleUrl: '../editor-style.css',
})
export class UserEditor implements OnInit {



  userIds: string[] = [];
  selectedId: string = "";
  user: User | null = null;

  nickname: string = "";
  email: string = "";
  iconUrl: string = "";
  direcciones: Set<Direccion> = new Set();
  platos: Set<Plato> = new Set();

  chachedIcon? : File

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoUsuario: boolean = false;
  errorUsuario: boolean = false;

  constructor(
    @Inject(UserControllerService) private userService: UserControllerService,
    private s3Service: S3Service,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getUserIDs().subscribe({
      next: (data) => {
        this.userIds = data;
        this.cargandoTodos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err)
        this.cargandoTodos = false;
        this.errorTodos = true;
        this.cdr.detectChanges();
      }
    })
  }

  cargarUsuario(): void {
    this.cargandoUsuario = true;
    this.userService.getByID(this.selectedId).subscribe({
      next: (data) => {
        this.user = data;
        this.cargandoUsuario = false;
        this.cargarDatosDeUsuario();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorUsuario = true;
        this.cargandoUsuario = false;
        this.cdr.detectChanges();
      }
    })

  }

  cargarDatosDeUsuario(): void {
    this.nickname = this.user?.nickname || "";
    this.email = this.user?.email || "";
    this.iconUrl = this.user?.iconUrl || "";
    this.direcciones = new Set(this.user?.direcciones || [])
    this.platos = new Set(this.user?.platosFavoritos || [])
  }

  update(): void {

    if (this.chachedIcon && this.user && this.user.id) {
      this.userService.createImageUrl(this.user.id).subscribe({
        next: (presignedUrl) =>  {
          if (this.user && this.user.id) {
            const iconUrl = this.url(this.user.id||"")
            if (this.chachedIcon) this.s3Service.saveImage(presignedUrl, this.chachedIcon)
            this.iconUrl = iconUrl;
          }
        }
      })
    }

    this.userService.updateUser({
      id: this.user?.id,
      nickname: this.nickname,
      email: this.email,
      iconUrl: this.iconUrl,
      direcciones: [...this.direcciones] as unknown as Set<Direccion>,
      platosFavoritos: [...this.platos] as unknown as Set<Plato>
    }).subscribe({
      next: (data) => {
        if (data) {
          alert("Se han actualizado los datos del usuario");
        } else {
          alert("No se ha podido actualizar los datos del usuario")
        }
      },
      error: (err) => {
        console.error(err)
        alert("Se ha producido un error actualizando los datos del usuario")
      },
      complete: () => { }
    })
  }

  agregarDireccion(direccion: Direccion): void {
    const yaExiste = [...this.direcciones].find(d => d.id === direccion.id)
    if (yaExiste) {
      alert("Esta direccion ya esta registrada!")
    } else {
      this.direcciones.add(direccion);
      this.cdr.detectChanges();
    }
  }

  eliminarDireccion(direccion: Direccion): void {
    this.direcciones.delete(direccion);
  }

  agregarPlato(plato: Plato): void {
    const yaExiste = [...this.platos].find(p => p.id === plato.id);
    if (yaExiste) {
      alert("Este plato ya esta registrada");
    } else {
      this.platos.add(plato)
      this.cdr.detectChanges();
    }
  }

  eliminarPlato(plato: Plato): void {
    this.platos.delete(plato);
  }

  delete() {
    const borrar = confirm("¿Estas seguro de querer borrar este usuario?")

    if (borrar) {
      if (this.user && this.user.id) {
        this.userService.deleteByID(this.user.id).subscribe({
          next: (data) => {
            if (data) {
              alert("Se ha borrado exitosamente el usuario")
              this.clearFromList(this.user?.id || "");
              this.user = null;
              this.cdr.detectChanges();
            } else {
              alert("No se ha podido borrar el usuario")
            }
          },
          error: (err) => {
            console.error(err)
            alert("Se ha producido un error borrando el usuario")
          }
        })
      }
    }
  }

  clearFromList(userId: string) {
    const index = this.userIds.indexOf(this.userIds.find(u => u === userId) || "");
    if (index !== -1) {
      this.userIds.splice(index, 1)
    }
  }

  resetProfilePic() {
    this.iconUrl = this.s3Service.DEAFULT_USER_PROFILE_PIC
    this.clearCachePic()
  }

  cacheProfilePic(image: File) {
    this.chachedIcon = image;
  }

  clearCachePic() {
    this.chachedIcon = undefined;
  }

  url(id: string) {
    return this.s3Service.url(URLType.USER, id)
  }

  downloadProfilePic() { // No funciona por CORS lol
    if (this.user && this.user.id)
      this.s3Service.downloadImage(this.iconUrl, this.user.id + ".jpg")
  }

  showProfilePic() {
    window.open(this.s3Service.getFullImageUrl(this.iconUrl), "_blank")
  }

  showCachedPic() {
    if (this.chachedIcon) {
      window.open(URL.createObjectURL(this.chachedIcon), "_blank")
    }
  }
}
