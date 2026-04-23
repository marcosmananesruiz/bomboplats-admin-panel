import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-list-selector',
  imports: [FormsModule],
  templateUrl: './list-selector.html',
  styleUrl: './list-selector.css',
})
export class ListSelector {

  @Input() lista? : string[]
  @Output() itemSelected : EventEmitter<string> = new EventEmitter<string>()

  selected : string = ""

  add() {
    if (this.selected.trim() !== '') {
      this.itemSelected.emit(this.selected.trim());
      this.selected = '';  // limpia el input tras emitir
    } else {
      alert('El valor no puede estar vacío');
    }
  }
}
