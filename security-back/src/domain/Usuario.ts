import { getInstance } from '../db';

export async function getOne(id: string) {
  const db = getInstance();
  return db
    .select()
    .from<Usuario>('usuario')
    .where('id', id)
    .first();
}

export async function findByNome(nome: string) {
  const db = getInstance();
  return db
    .select()
    .from<Usuario>('usuario')
    .where('nome', nome)
    .first();
}
