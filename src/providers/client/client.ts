import { DatabaseProvider } from '../database/database';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

//Provider que vai trabalhar com o CRUD de Clientes
@Injectable()
export class ClientProvider {

  constructor(public dbProvider: DatabaseProvider) { }

  //Inserção de um cliente
  public insert(client: Client) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into clients (cnpj, name, endereco) values (?, ?, ?)';
        let data = [client.cnpj, client.name, client.endereco];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Atualização de um Cliente
  public update(client: Client) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update clients set cnpj = ?, name = ?, endereco = ? where id = ?';
        let data = [client.cnpj, client.name, client.endereco, client.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Remoção de um cliente
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from clients where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Consulta de um cliente
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from clients where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let client = new Client();
              client.id = item.id;
              client.cnpj = item.cnpj;
              client.name = item.name;
              client.endereco = item.endereco;

              return client;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Consulta de vários clientes
  public getTodos() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      return db.executeSql('select * from clients', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let clients: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var client = data.rows.item(i);
              clients.push(client);
            }
            return clients;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}

export class Client {
  id: number;
  cnpj: number;
  name: string;
  endereco: string;
}
