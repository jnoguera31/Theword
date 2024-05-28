import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaphotoPageRoutingModule } from './pruebaphoto-routing.module';

import { PruebaphotoPage } from './pruebaphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaphotoPageRoutingModule
  ],
  declarations: [PruebaphotoPage]
})
export class PruebaphotoPageModule {}
