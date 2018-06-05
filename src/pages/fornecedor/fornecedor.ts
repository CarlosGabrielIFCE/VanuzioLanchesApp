import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { FornecedorProvider, Fornecedor } from '../../providers/fornecedor/fornecedor';


//Componente que vai importar as funções do provider
@IonicPage()
@Component({
  selector: 'page-fornecedor',
  templateUrl: 'fornecedor.html',
})
export class FornecedorPage {
  fornecedores: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private fornecedorProvider: FornecedorProvider) { }

  //Carregando os fornecedores
  ionViewDidEnter() {
    this.getAllFornecedores();
  }

  //Retornando todos os fornecedores
  getAllFornecedores() {
    this.fornecedorProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.fornecedores = result;
      });
  }

  //Adicionando Fornecedores
  addFornecedor() {
    this.navCtrl.push('EditFornecedorPage');
  }

  //Editando fornecedores
  editFornecedor(id: number) {
    this.navCtrl.push('EditFornecedorPage', {id: id});
  }

  //Removendo fornecedores
  removeFornecedor(fornecedor: Fornecedor) {
    this.fornecedorProvider.remove(fornecedor.id)
      .then(() => {
        var index = this.fornecedores.indexOf(fornecedor);
        this.fornecedores.splice(index, 1);
        this.toast.create({ message: "Fornecedor removido com sucesso", duration: 3000, position: 'bottom'}).present();
      })
  }

  //Filtrando fornecedores
  filterFornecedores(ev: any){
    this.getAllFornecedores();
  }

}
