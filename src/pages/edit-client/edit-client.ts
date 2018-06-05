import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { ClientProvider, Client} from '../../providers/client/client';

//Formulário de Clientes
@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {
  model: Client;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private clientProvider: ClientProvider) {
                this.model = new Client();

                if (this.navParams.data.id){
                  this.clientProvider.get(this.navParams.data.id)
                    .then((result: any) => {
                      this.model = result;
                    })
                }
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClientPage');
  }

  //Salvando os Clientes
  save() {
    this.saveClient()
      .then(() => {
        this.toast.create({ message: 'Cliente salvo', duration: 3000, position: 'bottom'}).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cliente', duration: 3000, position: 'bottom'}).present();
      })
  }

  private saveClient() {
    if (this.model.id) {
      return this.clientProvider.update(this.model);
    }else{
      return this.clientProvider.insert(this.model);
    }
  }

}
