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
  listDD= [];
  onCheck= false;
  checked= false;
  tick= false;
  st;
  constructor(public modalController: ModalController, private auth: AuthService) {
  }

  ngOnInit() {
    console.log(this.data);
    this.auth.getListSV(this.data.id);
    this.auth.demBuoi(this.data.id);
    this.st= this.auth.Student;
  }

  checkAll(){
    this.onCheck= !this.checkAll;
    this.tick= true;
    this.checked= !this.checked;
    if(this.onCheck && this.tick){
      this.listDD = this.auth.Student;
      console.log(this.listDD);
    }else{
      this.listDD= [];
      console.log(this.listDD);
    }
  }

  // function when edit class of GV when add new GV
  onChange(checked, item){
    if(this.onCheck == false){
      if(checked && this.listDD.indexOf(item) == -1){
        this.listDD.push(item);
        console.log(this.listDD);
        if(this.listDD.length == this.auth.Student.length){
          this.tick= true;
        }
      }else{
        this.listDD.splice(this.listDD.indexOf(item) , 1);
        this.tick= false;
        console.log(this.listDD);
      }
    }
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  async diemdanh(){
    this.auth.daDiemDanh= this.listDD;
    this.auth.diemdanhSTT= false;
    await this.auth.themBuoi(this.data.id);
    let comat=this.listDD;
    // console.log(comat);
    console.log("ID: "+this.data.id);
    this.auth.diemdanhSV(comat, this.data.id);
  }
}
