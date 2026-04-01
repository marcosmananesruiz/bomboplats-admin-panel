import { Component } from '@angular/core';

@Component({
  selector: 'app-element-display',
  imports: [],
  templateUrl: './element-display.html',
  styleUrl: './element-display.css',
})
export class ElementDisplay {
  cargando: boolean = true;
  error: boolean = false;
  empty: boolean = false;
}



