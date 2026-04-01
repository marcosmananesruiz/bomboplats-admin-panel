import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-string-input',
  imports: [FormsModule],
  templateUrl: './string-input.html',
  styleUrl: './string-input.css'
})
export class StringInput {

  @Input() placeholder: string = 'Escribe un valor...';
  @Output() valorAñadido = new EventEmitter<string>();

  valor: string = '';

  add(): void {
    if (this.valor.trim() !== '') {
      this.valorAñadido.emit(this.valor.trim());
      this.valor = '';  // limpia el input tras emitir
    } else {
      alert('El valor no puede estar vacío');
    }
  }
}
