import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product';
import { FornecedorProvider } from '../../providers/fornecedor/fornecedor';

//Formulário dos produtos
@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  model: Product;
  fornecedores: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private productProvider: ProductProvider,
              private fornecedorProvider: FornecedorProvider) {
                this.model = new Product();

                if(this.navParams.data.id) {
                  this.productProvider.get(this.navParams.data.id)
                    .then((result: any) => {
                      this.model = result;
                    })
                }
  }

  //Carregando os fornecedores do Produto
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    this.fornecedorProvider.getTodos()
      .then((result: any[]) => {
        this.fornecedores = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os fornecedores', duration: 3000, position: 'bottom'}).present();
      })
  }

  //Salvando um produto
  save() {
    this.saveProduct()
      .then(() => {
        this.toast.create({ message: 'Produto salvo', duration: 3000, position: 'bottom'}).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o produto', duration: 3000, position: 'bottom'}).present();
      })
  }

  private saveProduct() {
    if(this.model.id) {
      return this.productProvider.update(this.model);
    }else {
      return this.productProvider.insert(this.model);
    }
  }

}
