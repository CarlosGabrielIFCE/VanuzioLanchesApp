import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS fornecedores (id integer primary key AUTOINCREMENT NOT NULL, cnpj integer NOT NULL, name TEXT, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))'],
      ['CREATE TABLE IF NOT EXISTS products(id integer primary key AUTOINCREMENT NOT NULL, name TEXT, unidade TEXT, quantidade FLOAT, precovenda FLOAT, precocompra FLOAT, validade DATE, active integer, fornecedor_id integer, FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id))'],
      ['CREATE TABLE IF NOT EXISTS clients (id integer primary key AUTOINCREMENT NOT NULL, cnpj integer NOT NULL, name TEXT, endereco TEXT)'],
      ['CREATE TABLE IF NOT EXISTS vendas (id integer primary key AUTOINCREMENT NOT NULL, valorvenda FLOAT, desconto FLOAT, datavenda DATE, client_id integer, FOREIGN KEY(client_id) REFERENCES clients(id))'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
        // Criando as tabelas
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Supermercados']],
          ['insert into categories (name) values (?)', ['Bares']],
          ['insert into categories (name) values (?)', ['Restaurantes']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }
}