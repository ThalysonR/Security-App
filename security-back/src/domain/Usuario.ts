import { getInstance } from '../db';
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';

/**
 * [Segurança] Todas as funções que inserem novas informações no banco através de input do usuário usam parameter binding
 * para que a biblioteca cuide de 'escapar' os caracteres especiais. Vide 'SQL Injection'
 */

export async function getOne(id: string) {
  const db = await getInstance();
  return db
    .select()
    .from<Usuario>('usuarios')
    .where('id', id)
    .first();
}

export async function findAll() {
  const db = await getInstance();
  return db.select().from<Usuario>('usuarios');
}

export async function findByNome(nome: string) {
  const db = await getInstance();
  return db
    .select()
    .from<Usuario>('usuarios')
    .where('nome', nome)
    .first();
}

/**
 * [Segurança] Na criação do usuário, encriptamos a senha usando bcrypt.
 * Geramos também um 'salt' que será armazenado com a senha. Vide ataque 'Rainbow Table'
 */
export async function createUsuario(usuario: Usuario) {
  const db = await getInstance();
  return db('usuarios').insert({
    nome: usuario.nome,
    senha: bcrypt.hashSync(usuario.senha, bcrypt.genSaltSync(10)),
  });
}
