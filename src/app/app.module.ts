import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebase } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgxQRCodeModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebase), AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
