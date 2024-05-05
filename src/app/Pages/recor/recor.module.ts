import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorPageRoutingModule } from './recor-routing.module';

import { RecorPage } from './recor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorPageRoutingModule
  ],
  declarations: [RecorPage]
})
export class RecorPageModule {}
