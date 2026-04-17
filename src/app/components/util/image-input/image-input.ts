import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  styleUrl: './image-input.css',
})
export class ImageInput {

  @Output() onImageSelected: EventEmitter<File> = new EventEmitter<File>()

  image? : File

  selectImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      this.image = file;
    }
  }

  sendImage() {
    if (this.image) {
      this.onImageSelected.emit(this.image)
    } else {
      alert("¡Aun no has puesto ninguna imagen!")
    }
  }
}
