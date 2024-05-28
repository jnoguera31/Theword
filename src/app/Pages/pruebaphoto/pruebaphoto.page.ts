
import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.services';

@Component({
  selector: 'app-home',
  templateUrl: 'pruebaphoto.page.html',
  styleUrls: ['pruebaphoto.page.scss'],
})
export class PruebaphotoPage {

  photoUrl: string | undefined;

  constructor(private photoService: PhotoService) {}

  async takeAndSavePhoto() {
    const photo = await this.photoService.takePhoto();
    this.photoUrl = await this.photoService.savePhoto(photo);
  }
}

