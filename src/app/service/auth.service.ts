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
  ClassRef: AngularFireList < any > = null;
  lop: any;
  returnUrl: string;
  constructor(private router: Router,private db: AngularFireDatabase, private route: ActivatedRoute) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  Login(email, password){
    this.UsersRef = this.db.list('GV');
    this.UsersRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {
                key, ...data
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
  getLOP(){
    this.lop=this.userlogin.lop;
  }
  pushQR(key, data){
    this.ClassRef =  this.db.list('LOP');
    this.ClassRef.update(key, {"qr": data});
    // 3p sau delete qr-code on database
    setTimeout(() => {
      this.ClassRef.update(key, {"qr": null})
    }, 180000);
  }
}
