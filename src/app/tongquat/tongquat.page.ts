import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RegisterPage } from '../pages/register/register.page';
import { ToastController, ModalController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-tongquat',
  templateUrl: './tongquat.page.html',
  styleUrls: ['./tongquat.page.scss'],
})
export class TongquatPage implements OnInit {
  hours;
  min;
  thu;
  qrData = null;
  createdCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  show= false;
  keys;
  constructor(public modalController: ModalController, private auth: AuthService, public toast: ToastController, private base64ToGallery: Base64ToGallery) { 
    this.auth.getLOP();
    this.getTime();
  }

  ngOnInit() {
    setInterval(() => {
      this.getTime();
    }, 60000);
  }
  
  async presentModal(data) {
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'data': data
      }
    });
    console.log(data)
    return await modal.present();
  }

  // Get time online
  getTime(){
    this.hours= new Date().getHours();
    this.min= new Date().getMinutes();
    this.thu= new Date().getDay();
    console.log(this.hours+":"+this.min)
  }

  // Download QR
  downloadQR(){
    const canvas= document.querySelector('canvas') as HTMLCanvasElement;
    const imageData= canvas.toDataURL('image/jpeg').toString();

    let data= imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(data, {prefix: '_img', mediaScanner: true}).then( async res =>{
      let toast= await this.toast.create({
        header: 'QR Code saved in your library'
      });
      toast.present();
    }, err =>{
      console.log('err: ', err);
    });
  }

  // Create ID random
  makeid(length) {
    var result='';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  // function tạo mã và push code lên database
  createCode(){
    this.createdCode=this.makeid(10)+this.keys;
    console.log(this.createdCode);
    this.auth.pushQR(this.keys, this.createdCode);
    this.noted();
    setTimeout(() => {
      this.show= false;
    }, 60000);
    
  }
  // function show card nhập và tạo QR
  createQR(key){
    this.show= true;
    this.keys= key;
  }
  // function check lịch dạy có đang online
  checkSTT(lichday){
    var thuday;
    switch (lichday.thuday) {
      case 'thứ hai':
        thuday= 1;
        break;
      case 'thứ ba':
        thuday= 2;
        break;
      case 'thứ tư':
        thuday= 3;
        break;
      case 'thứ năm':
        thuday= 4;
        break;
      case 'thứ sáu':
        thuday= 5;
        break;
      case 'thứ bảy':
        thuday= 6;
        break;
      case 'chủ nhật':
        thuday= 0;
        break;
    }
    // => get giờ phút bắt đầu
    let hs=parseInt(lichday.gioday.giobd.slice(0,2));
    let ms=parseInt(lichday.gioday.giobd.slice(3,5));
    // console.log("giờ bđ: "+hs+" : "+ms);
    // => get giờ phút kết thúc
    let he=parseInt(lichday.gioday.giokt.slice(0,2));
    let me=parseInt(lichday.gioday.giokt.slice(3,5));
    // console.log("giờ kt: "+he+" : "+me);

    if(thuday != this.thu){
      return false;
    }else{
      if( (hs < this.hours) && (he > this.hours) ){
        return true;
      }else{
        if( (hs === this.hours) && (ms <= this.min) || (he === this.hours) && (me >= this.min) ){
          return true;
        }else{
          return false;
        }
      }
    }
  }
  async noted(){
    const toast = await this.toast.create({
        message: 'Đã tạo xong code. 3 phút sau code sẽ tự động xóa.',
        duration: 1000
      });
      toast.present();
  }
  async update(){
    const toast = await this.toast.create({
        message: 'Updated',
        duration: 1000
      });
      this.ngOnInit();
      toast.present();
  }
}
