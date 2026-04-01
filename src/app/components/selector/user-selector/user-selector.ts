import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { User, UserControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-selector',
  imports: [FormsModule],
  templateUrl: './user-selector.html',
  styleUrl: './user-selector.css',
})
export class UserSelector implements OnInit {

  @Input() actionText: string = "Añadir"
  @Output() userAñadido = new EventEmitter<User>();

  users: User[] = [];
  user: User | null = null;

  cargando: boolean = true;
  error: boolean = false;

  constructor(
    @Inject(UserControllerService) private userService: UserControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err)
        alert("Se ha producido un error con la carga de datos")
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    })
  }

  add(): void {
    if (this.user) {
      this.userAñadido.emit(this.user)
    } else {
      alert("Seleccione un usuario para añadir")
    }
  }
}
