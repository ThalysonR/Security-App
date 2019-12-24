import knex from 'knex';
import fs from 'fs';
import path from 'path';

let instance: knex;

async function initDb(db: knex) {
  fs.unlinkSync(path.join(__dirname, '..', 'app_db'));
  await db.schema.createTable('usuarios', tb => {
    tb.increments('id').primary();
    tb.string('nome').notNullable();
    tb.string('senha').notNullable();
  });
  await db.schema.createTable('comentarios', tb => {
    tb.increments('id').primary();
    tb.bigInteger('id_usuario')
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');
    tb.text('comentario').notNullable();
  });
}

export async function getInstance(): Promise<knex> {
  if (instance != null) {
    return Promise.resolve(instance);
  }

  instance = knex({
    client: 'sqlite3',
    connection: {
      filename: './app_db',
    },
  });
  await initDb(instance);
  console.log('initdb');

  return instance;
}
