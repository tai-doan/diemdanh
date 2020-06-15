import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { TongquatPageRoutingModule } from './tongquat-routing.module';

import { TongquatPage } from './tongquat.page';


@NgModule({
  imports: [
    CommonModule,
    NgxQRCodeModule,
    FormsModule,
    IonicModule,
    TongquatPageRoutingModule,
  ],
  declarations: [TongquatPage]
})
export class TongquatPageModule {}
