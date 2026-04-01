import { Component, signal } from '@angular/core';
import { DisplayContainer } from "./components/display-container/display-container";
import { AdderContainer } from "./components/adder-container/adder-container";
import { EditorContainer } from "./components/editor-container/editor-container";

@Component({
  selector: 'app-root',
  imports: [DisplayContainer, AdderContainer, EditorContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bomboplats-admin-panel');
  elementDisplay: boolean = false;
  elementAdder: boolean = false;
  elementEditor: boolean = false;

  mostrarElementDisplay(): void {
    this.elementDisplay = true;
    this.elementAdder = false;
    this.elementEditor = false;
  }

  mostrarElementAdder(): void {
    this.elementDisplay = false;
    this.elementAdder = true;
    this.elementEditor = false;
  }

  mostrarElementEditor(): void {
    this.elementDisplay = false;
    this.elementAdder = false;
    this.elementEditor = true;
  }

  reiniciarPagina(): void {
    this.elementAdder = false;
    this.elementDisplay = false;
    this.elementEditor = false;
  }

  esPaginaIniciar(): boolean {
    return !this.elementAdder && !this.elementDisplay && !this.elementEditor
  }
}
