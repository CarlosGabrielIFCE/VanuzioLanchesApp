import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/** Provider criado para fazer o CRUD de fornecedores */
@Injectable()
export class FornecedorProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  //Inserção de um fornecedor
  public insert(fornecedor: Fornecedor) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into fornecedores (cnpj, name, active, category_id) values (?, ?, ?, ?)';
        let data = [fornecedor.cnpj, fornecedor.name, fornecedor.active ? 1 : 0, fornecedor.category_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Atualização de um fornecedor
  public update(fornecedor: Fornecedor) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update fornecedores set cnpj = ?, name = ?, active = ?, category_id = ? where id = ?';
        let data = [fornecedor.cnpj, fornecedor.name, fornecedor.active ? 1 : 0, fornecedor.category_id, fornecedor.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Exclusão de um fornecedor
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from fornecedores where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Retorna um fornecedor 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from fornecedores where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let fornecedor = new Fornecedor();
              fornecedor.id = item.id;
              fornecedor.cnpj = item.cnpj;
              fornecedor.name = item.name;
              fornecedor.category_id = item.category_id;
              fornecedor.active = item.active;

              return fornecedor;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Retorna todos os fornecedores ativos ou inativos
  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT f.*, c.name as category_name FROM fornecedores f inner join categories c on f.category_id = c.id where f.active = ?';
        var data: any[] = [active ? 1 : 0];

        // filtrando pelo nome
        if (name) {
          sql += ' and f.name like ?'
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let fornecedores: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var fornecedor = data.rows.item(i);
                fornecedores.push(fornecedor);
              }
              return fornecedores;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //Função que adaptei pra pegar todos os fornecedores, que vou utilizar quando for criar um produto
  public getTodos() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      return db.executeSql('select * from fornecedores', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let fornecedores: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var fornecedor = data.rows.item(i);
              fornecedores.push(fornecedor);
            }
            return fornecedores;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}

export class Fornecedor {
  id: number;
  cnpj: number;
  name: string;
  category_id: number;
  active: number;
}
