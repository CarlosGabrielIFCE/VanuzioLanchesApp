import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

//Provider que vai cuidar do CRUD das Vendas
@Injectable()
export class VendaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  //Inserção de uma venda
  public insert(venda: Venda) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into vendas (valorvenda, desconto, datavenda, client_id) values (?, ?, ?, ?)';
        let data = [venda.valorvenda, venda.desconto, venda.datavenda, venda.client_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Atualização de uma venda
  public update(venda: Venda) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update vendas set valorvenda = ?, desconto = ?, datavenda = ?, client_id = ? where id = ?';
        let data = [venda.valorvenda, venda.desconto, venda.datavenda, venda.client_id, venda.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Remoção de uma venda
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from vendas where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Consulta de uma venda
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from vendas where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let venda = new Venda();
              venda.id = item.id;
              venda.valorvenda = item.valorvenda;
              venda.desconto = item.desconto;
              venda.datavenda = item.datavenda;
              venda.client_id = item.client_id;

              return venda;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Retornando todas as vendas
  public getTodos() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      return db.executeSql('select * from vendas', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let vendas: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var venda = data.rows.item(i);
              vendas.push(venda);
            }
            return vendas;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}

export class Venda {
  id: number;
  valorvenda: number;
  datavenda: number;
  desconto: number;
  client_id: number;

}
