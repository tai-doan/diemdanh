import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongquatPage } from './tongquat.page';

const routes: Routes = [
  {
    path: '',
    component: TongquatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TongquatPageRoutingModule {}
