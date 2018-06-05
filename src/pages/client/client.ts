import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { ClientProvider, Client } from '../../providers/client/client';

//Componente que vai carregar as funções SQL
@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  clients: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private clientProvider: ClientProvider) { }

  //Carregando todos os clientes
  ionViewDidEnter() {
    this.getAllClients();
    console.log('ionViewDidLoad ClientPage');
  }

  getAllClients() {
    this.clientProvider.getTodos()
      .then((result: any[]) => {
        this.clients = result;
      })
  }

  //Adicionar Cliente
  addClient() {
    this.navCtrl.push('EditClientPage');
  }

  //Editar Cliente
  editClient(id: number) {
    this.navCtrl.push('EditClientPage', {id: id})
  }

  //Remover Cliente
  removeClient(client: Client) {
    this.clientProvider.remove(client.id)
      .then(() => {
        var index = this.clients.indexOf(client);
        this.clients.splice(index, 1);
        this.toast.create({ message: 'Cliente removido', duration: 3000, position: 'bottom'}).present();
      })
  }

  //Filtrar clientes
  filterClients(ev: any) {
    this.getAllClients();
  }

}
