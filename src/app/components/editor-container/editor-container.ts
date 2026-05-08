import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UserEditor } from "../editor/user-editor/user-editor";
import { DireccionEditor } from "../editor/direccion-editor/direccion-editor";
import { PedidoEditor } from "../editor/pedido-editor/pedido-editor";
import { RestauranteEditor } from "../editor/restaurante-editor/restaurante-editor";
import { PlatoEditor } from "../editor/plato-editor/plato-editor";
import { AuthService } from '../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-container',
  imports: [FormsModule, UserEditor, DireccionEditor, PedidoEditor, RestauranteEditor, PlatoEditor],
  templateUrl: './editor-container.html',
  styleUrl: './editor-container.css',
})
export class EditorContainer implements OnInit {
  entitySelected: string = "";

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.router.navigate(["/unauthorized"])
    }
  }
}
