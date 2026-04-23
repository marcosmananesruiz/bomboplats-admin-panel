import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class S3Service {

  private readonly BUCKET_NAME : string = environment.s3bucket

  private readonly USER_DIRECTORY = "profile/"
  private readonly PLATO_DIRECTORY = "platos/"
  private readonly RESTAURANTE_DIRECTORY = "restaurantes/"
  private readonly IMAGE_EXTENSION = ".jpg"

  public readonly DEAFULT_USER_PROFILE_PIC : string = this.url(URLType.USER, "default")
  public readonly DEAFULT_PLATO_PIC: string = this.url(URLType.PLATO, "default")
  public readonly DEFAULT_RESTAURANTE_PIC: string = this.url(URLType.REST, "default", 0)

  constructor(
    private http: HttpClient
  ) {}

  saveImage(presignedUrl: string, image: File) {

    const headers = new HttpHeaders({
      'Content-Type': image.type
    })

    this.http.put(presignedUrl, image, {headers: headers}).subscribe({
      next: (data) => {
        if (data) {
          console.log(image.name + " saved as " + presignedUrl)
        }
      },
      error: (err) => this.onError(err)

    })
  }

  getFullImageUrl(iconUrl: string): string {
    return this.BUCKET_NAME + iconUrl
  }

  url(urlType: URLType, id: string, index?: number): string {
    switch (urlType) {
      case URLType.USER: return this.USER_DIRECTORY + id + this.IMAGE_EXTENSION // profile/U1.jpg
      case URLType.PLATO: return this.PLATO_DIRECTORY + id + this.IMAGE_EXTENSION // platos/T1.jpg
      case URLType.REST: {
        if (index !== undefined) {
          return this.RESTAURANTE_DIRECTORY + id + "/" + index + this.IMAGE_EXTENSION // restaurantes/R1/0.jpg
        } else {
          throw new Error("REST UrlType must have index parameter")
        }
      }
    }
  }

  private onError(err: any) {
    console.error(err)
    alert("Error on S3Service: " + err)
  }

}

export enum URLType {
  USER = "USER",
  PLATO = "PLATO",
  REST = "RESTAURANTE"
}
