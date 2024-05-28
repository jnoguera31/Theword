import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<Photo> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // Obtener la foto como URI
      source: CameraSource.Camera, // Usar la cámara del dispositivo
      quality: 100 // Calidad de la imagen
    });
    return photo;
  }

  async savePhoto(photo: Photo): Promise<string> {
    // En este ejemplo, simplemente retornamos la URI de la foto
    // En una implementación real, podrías guardar la foto en el almacenamiento local o en un servidor
    return photo.webPath!;
  }
}
