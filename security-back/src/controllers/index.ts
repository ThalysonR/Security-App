import root from './root';
import usuarios from './usuarios';
import auth from './auth';
import comentarios from './comentarios';
import { Application } from 'express';

export function registerHandlers(app: Application) {
  const handlers: Array<(app: Application) => void> = [];
  handlers.concat(root, usuarios, auth, comentarios).forEach(handler => handler(app));
}
