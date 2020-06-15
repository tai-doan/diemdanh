import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() data; // data môn dạy của GV
  mon;
  listDD= [];
  constructor(public modalController: ModalController, private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.getListSV(this.data[0].id);
    this.auth.demBuoi(this.data[0].id);
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // function when edit class of GV when add new GV
  onChange(checked, item){
    if(checked){
      this.listDD.push(item);
      console.log(this.listDD);
    }else{
      this.listDD.splice(this.listDD.indexOf(item) , 1)
      console.log(this.listDD);
    }
  }
  
  async diemdanh(){
    this.auth.diemdanhSTT= false;
    await this.auth.themBuoi(this.data[0].id);
    let comat=[];
    for(let i=0; i< this.listDD.length; i++){
      await comat.push(this.listDD[i].tensv);
    }
    this.auth.diemdanhSV(comat, this.data[0].id);
  }
}
