import { Component } from '@angular/core';

@Component({
  selector: 'app-element-display',
  imports: [],
  templateUrl: './element-display.html',
  styleUrl: './element-display.css',
})
export class ElementDisplay {
  protected cargando: boolean = true;
  protected error: boolean = false;
  protected empty: boolean = false;
}



