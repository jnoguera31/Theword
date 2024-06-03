import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<Photo> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // Obtener la foto como base64
      source: CameraSource.Camera, // Usar la cámara del dispositivo
      quality: 90 // Calidad de la imagen
    });
    return photo;
  }

  async savePhotoToVariable(): Promise<string> {
    const photo = await this.takePhoto();
    // photo.base64String debería contener la imagen en base64
    if (photo.base64String) {
      return `data:image/jpeg;base64,${photo.base64String}`;
    } else {
      throw new Error('Failed to take photo');
    }
  }
}
