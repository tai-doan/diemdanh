import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userlogin: any;
  UsersRef: AngularFireList < any > = null;
  StudentRef: AngularFireList < any > = null;
  ClassRef: AngularFireList < any > = null;
  BuoiRef: AngularFireList < any > = null;
  mon: any; // array mon of teacher
  returnUrl: string;
  Buoi; // Lenght of buoi in MonHoc
  Student; // All student in mon
  keyUpdate; // Key updatẻd of diemdanh
  diemdanhSTT= true; // Status diemdanh
  daDiemDanh=[]; // list student diemdanh
  constructor(private router: Router,private db: AngularFireDatabase, private route: ActivatedRoute) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  diemdanhSV(data, idmon){
    this.BuoiRef = this.db.list(`MonHoc/${idmon}/diemdanh/`);
    this.BuoiRef.update(this.keyUpdate, {comat: data});
  }

  themBuoi(idmon){
    let data= new Date().toLocaleDateString();
    this.BuoiRef = this.db.list(`MonHoc/${idmon}/diemdanh/`);
    this.keyUpdate= this.BuoiRef.push({ngay: data}).key;
    this.BuoiRef.update(this.keyUpdate, {id: this.keyUpdate});
  }

  demBuoi(idmon){
    this.BuoiRef = this.db.list(`MonHoc/${idmon}/diemdanh`);
    this.BuoiRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const id = a.payload.key;
            return {
                id, ...data
            }; // or {key, ...data} in case data is Obj
        });
    })).subscribe(data => {
      this.Buoi= data;
      console.log(data.length);
    })
  }
  
  Login(email, password){
    this.UsersRef = this.db.list('GV');
    this.UsersRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const id = a.payload.key;
            return {
                id, ...data
            }; // or {key, ...data} in case data is Obj
        });
    })).subscribe(user => {
      this.userlogin =  user.find(u => u.email === email && u.password === password);
      if(this.userlogin) {
        console.log("Login success");
        console.log(this.userlogin);
        localStorage.setItem("userlogin",JSON.stringify(this.userlogin));
        this.router.navigate(['tongquat']);
      }
    });
  }

  getListSV(idmon){
    this.StudentRef = this.db.list(`MonHoc/${idmon}/listsv`);
    this.StudentRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const id = a.payload.key;
            return {
                id, ...data
            }; // or {key, ...data} in case data is Obj
        });
    })).subscribe(data => {
      this.Student= data;
    })
  }

  getLOP(){
    this.mon=this.userlogin.mon;
  }

  async pushQR(key, data){
    this.ClassRef = await this.db.list('MonHoc');
    await this.ClassRef.update(key, {"qr": data});
    this.diemdanhSTT=!this.diemdanhSTT;
    let j= await this.db.list(`MonHoc/${key}/diemdanh`).push({}).key;
    let date= new Date().toLocaleDateString();
    await this.db.list(`MonHoc/${key}/diemdanh`).update(j, {id: j, ngay: date});

    let dt;
    this.db.list(`MonHoc/${key}/diemdanh`).valueChanges().subscribe(data => {
      dt= data;
      this.db.list(`MonHoc/${key}/diemdanh/${dt[dt.length-1].id}/comat`).valueChanges().subscribe(data =>{
        this.daDiemDanh= data;
        console.log(this.daDiemDanh);
      })
    })
    
    // 3p sau delete qr-code on database
    setTimeout(() => {
      this.ClassRef.update(key, {"qr": null})
    }, 180000);
  }
}
