import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<Photo> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // Obtener la foto como URI
      source: CameraSource.Camera, // Usar la cámara del dispositivo
      quality: 90 // Calidad de la imagen
    });
    return photo;
  }

  async savePhotoToVariable(): Promise<string> {
    const photo = await this.takePhoto();
    const base64Data = await this.photoToBase64(photo);
    return base64Data;
  }


  private async photoToBase64(photo: Photo): Promise<string> {
    // Leer la foto como una cadena base64
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('Failed to convert photo to base64.');
            }
        };
        reader.readAsDataURL(blob);
    });
  }
}
