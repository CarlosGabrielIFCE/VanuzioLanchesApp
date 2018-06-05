import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VendaProvider, Venda } from '../../providers/venda/venda';
import { ClientProvider } from '../../providers/client/client';

//Edição de venda
@IonicPage()
@Component({
  selector: 'page-edit-venda',
  templateUrl: 'edit-venda.html',
})
export class EditVendaPage {
  model: Venda;
  clients: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private vendaProvider: VendaProvider,
              private clientProvider: ClientProvider) {

                this.model = new Venda();

                if (this.navParams.data.id) {
                  this.vendaProvider.get(this.navParams.data.id)
                    .then((result: any) => {
                      this.model = result;
                    })
                }
  }

  //CArregando os clientes da venda
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVendaPage');
    this.clientProvider.getTodos()
      .then((result: any[]) => {
        this.clients = result;
      })
      .catch(() => {
        this.toast.create({ message: "Erro ao carregar os clientes", duration: 3000, position: "bottom"}).present();
      })
  }

  //Salvando uma venda
  save() {
    this.saveVenda()
      .then(() => {
        this.toast.create({ message: "Venda salva", duration: 3000, position: "bottom"}).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: "Erro ao salvar a venda", duration: 3000, position: "bottom"}).present();
      })
  }

  private saveVenda() {
    if (this.model.id) {
      return this.vendaProvider.update(this.model);
    }else {
      return this.vendaProvider.insert(this.model);
    }
  }

}
