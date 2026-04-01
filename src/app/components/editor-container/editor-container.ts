import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UserEditor } from "../editor/user-editor/user-editor";
import { DireccionEditor } from "../editor/direccion-editor/direccion-editor";
import { PedidoEditor } from "../editor/pedido-editor/pedido-editor";
import { RestauranteEditor } from "../editor/restaurante-editor/restaurante-editor";
import { PlatoEditor } from "../editor/plato-editor/plato-editor";

@Component({
  selector: 'app-editor-container',
  imports: [FormsModule, UserEditor, DireccionEditor, PedidoEditor, RestauranteEditor, PlatoEditor],
  templateUrl: './editor-container.html',
  styleUrl: './editor-container.css',
})
export class EditorContainer {
  entitySelected: string = "";
}
