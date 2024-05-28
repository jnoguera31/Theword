import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaphotoPage } from './pruebaphoto.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaphotoPageRoutingModule {}
