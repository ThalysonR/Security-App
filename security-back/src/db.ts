import knex from 'knex';

let instance: knex;

function initDb(db: knex) {
  db.schema.createTable('usuario', tb => {
    tb.increments('id').primary();
    tb.string('nome').notNullable();
    tb.string('senha').notNullable();
  });
}

export function getInstance(): knex {
  if (instance != null) {
    return instance;
  }

  instance = knex({
    client: 'sqlite3',
    connection: {
      filename: './app_db',
    },
  });

  return instance;
}
