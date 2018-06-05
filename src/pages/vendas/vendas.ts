import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VendaProvider, Venda } from '../../providers/venda/venda';


//Componente de Carregamento de vendas
@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {
  vendas: any[] = [];

  constructor(public navCtrl: NavController, private toast: ToastController, private vendaProvider: VendaProvider) { }

  //Carregandoo todas as vendas
  ionViewDidEnter() {
    this.getAllVendas();
  }

  getAllVendas() {
    this.vendaProvider.getTodos()
      .then((result: any[]) => {
        this.vendas = result;
      })
  }

  //Adicionar uma venda
  addVenda() {
    this.navCtrl.push('EditVendaPage');
  }

  //Editar uma venda
  editVenda(id: number) {
    this.navCtrl.push('EditVendaPage', {id: id})
  }

  //Remover uma venda
  removeVenda(venda: Venda) {
    this.vendaProvider.remove(venda.id)
      .then(() => {
        var index = this.vendas.indexOf(venda);
        this.vendas.splice(index, 1);
        this.toast.create({ message: "Venda removida", duration: 3000 , position: "bottom"}).present();
      })
  }

}
