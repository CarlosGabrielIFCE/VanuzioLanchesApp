import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product';


//Componente que vai carregar todas as requisicoes sql de Produtos
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  products: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private productProvider: ProductProvider) { }

  //Carregando todos os produtos
  ionViewDidEnter() {
    console.log('ionViewDidLoad ProductPage');
    this.getAllProducts();
  }

  //Retornando todos os produtos
  getAllProducts() {
    this.productProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.products = result;
      })
  }

  //Adicionar produto
  addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  //Editar produto
  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id});
  }

  //Remover produto
  removeProduct(product: Product) {
    this.productProvider.remove(product.id)
      .then(() => {
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.toast.create({ message: 'Produto removido', duration: 3000, position: 'bottom'}).present();
      })
  }

  //Filtrar produtos
  filterProducts(ev: any) {
    this.getAllProducts();
  }

}
