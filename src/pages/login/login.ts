import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: string = "Vanuzio";
  password: string = "abc123";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(login1: string, senha: string) {
    if(login1 == this.user && senha == this.password) {
      this.navCtrl.push(HomePage);
    }else {
      this.toast.create({ message:"Login/Senha incorretos", duration: 3000, position: 'bottom'}).present();
    }
  }

}
