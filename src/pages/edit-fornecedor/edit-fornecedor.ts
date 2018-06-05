import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { FornecedorProvider, Fornecedor } from '../../providers/fornecedor/fornecedor';
import { CategoriesProvider } from '../../providers/categories/categories';

//Componente que vai adicionar os Fornecedores, de fato
@IonicPage()
@Component({
  selector: 'page-edit-fornecedor',
  templateUrl: 'edit-fornecedor.html',
})
export class EditFornecedorPage {
  model: Fornecedor;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private fornecedorProvider: FornecedorProvider,
              private categoriesProvider: CategoriesProvider) {

                this.model = new Fornecedor();

                if(this.navParams.data.id) {
                  this.fornecedorProvider.get(this.navParams.data.id)
                    .then((result: any) => {
                      this.model = result;
                    })
                }
  }

  //Carregando as categorias
  ionViewDidLoad() {
    this.categoriesProvider.getAll()
      .then((result: any[]) => {
        this.categories = result;
      })
      .catch(() => {
        this.toast.create({ message: "Erro ao carregar as categorias", duration: 3000, position: 'bottom'}).present();
      })
  }

  //Salvando um fornecedor
  save() {
    this.saveFornecedor()
      .then(() => {
        this.toast.create({ message: "Fornecedor salvo", duration: 3000, position: "bottom"}).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o fornecedor', duration: 3000, position: 'bottom'}).present();
      })
  }

  private saveFornecedor() {
    if (this.model.id) {
      return this.fornecedorProvider.update(this.model);
    }else{
      return this.fornecedorProvider.insert(this.model);
    }
  }

}
