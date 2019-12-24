import { getInstance } from '../db';
import { Comentario } from '../models/Comentario';

export async function createComentario({ id_usuario, comentario }) {
  const db = await getInstance();

  return db('comentarios').insert({
    id_usuario,
    comentario,
  });
}

export async function getAll() {
  const db = await getInstance();

  return db.select().from<Comentario>('comentarios');
}
