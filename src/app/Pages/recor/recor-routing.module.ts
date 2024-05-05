import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorPage } from './recor.page';

const routes: Routes = [
  {
    path: '',
    component: RecorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecorPageRoutingModule {}
