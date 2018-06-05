import { DatabaseProvider } from '../database/database';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

//Provider que vai trabalhar com o CRUD dos produtos
@Injectable()
export class ProductProvider {

  constructor(public dbProvider: DatabaseProvider) { }

  //Inserção de um produto
  public insert(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into products (name, unidade, quantidade, precovenda, precocompra, validade, active, fornecedor_id) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [product.name, product.unidade, product.quantidade, product.precovenda, product.precocompra, product.validade, product.active ? 1 : 0, product.fornecedor_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Atualização de um produto
  public update(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update products set name = ?, unidade = ?, quantidade = ?, precovenda = ?, precocompra = ?, validade = ?, active = ?, fornecedor_id = ? where id = ?';
        let data = [product.name, product.unidade, product.quantidade, product.precovenda, product.precocompra, product.validade, product.active ? 1 : 0, product.fornecedor_id, product.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Remoção de um produto
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Consulta de um produto
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.unidade = item.unidade;
              product.quantidade = item.quantidade;
              product.precovenda = item.precovenda;
              product.precocompra = item.precocompra;
              product.validade = item.validade;
              product.active = item.active;
              product.fornecedor_id = item.fornecedor_id;

              return product;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Consulta de todos os produtos
  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db : SQLiteObject) => {
        let sql = 'SELECT p.*, f.name as fornecedor_name FROM products p inner join fornecedores f on p.fornecedor_id = f.id where p.active = ?';
        var data: any[] = [active ? 1 : 0];

        if(name) {
          sql += ' and p.name like ?';
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if(data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            }else{
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Product {
  id: number;
  name: string;
  unidade: string;
  quantidade: number;
  precovenda: number;
  precocompra: number;
  validade: number;
  active: number;
  fornecedor_id: number;
}
