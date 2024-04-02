import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { JuegoPageRoutingModule } from './juego-routing.module';
import { JuegoPage } from './juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [JuegoPage]
})
export class JuegoPageModule {}
