import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { Direccion, Plato, User, UserControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";
import { DireccionSelector } from "../../selector/direccion-selector/direccion-selector";
import { PlatoSelector } from "../../selector/plato-selector/plato-selector";

@Component({
  selector: 'app-user-editor',
  imports: [FormsModule, DireccionSelector, PlatoSelector],
  templateUrl: './user-editor.html',
  styleUrl: '../editor-style.css',
})
export class UserEditor implements OnInit {

  userIds: string[] = [];
  selectedId: string = "";
  userSelected: User | null = null;

  nickname: string = "";
  email: string = "";
  iconUrl: string = "";
  direcciones: Set<Direccion> = new Set();
  platos: Set<Plato> = new Set();

  cargandoTodos: boolean = true;
  errorTodos: boolean = false;

  cargandoUsuario: boolean = false;
  errorUsuario: boolean = false;

  constructor(
    @Inject(UserControllerService) private userService: UserControllerService,
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
        this.userSelected = data;
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
    this.nickname = this.userSelected?.nickname || "";
    this.email = this.userSelected?.email || "";
    this.iconUrl = this.userSelected?.iconUrl || "";
    this.direcciones = new Set(this.userSelected?.direcciones || [])
    this.platos = new Set(this.userSelected?.platosFavoritos || [])
  }

  update(): void {
    this.userService.updateUser({
      id: this.userSelected?.id,
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
}
