import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FornecedorPage } from '../fornecedor/fornecedor';
import { ProductPage } from '../product/product';
import { ClientPage } from '../client/client';
import { VendasPage } from '../vendas/vendas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public navParams: NavParams) {
  }

  goToFornecedorPage() {
    this.navCtrl.push(FornecedorPage);
  }

  goToProductsPage() {
    this.navCtrl.push(ProductPage);
  }

  goToVendasPage() {
    this.navCtrl.push(VendasPage);
  }

  goToClientPage() {
    this.navCtrl.push(ClientPage);
  }
}
