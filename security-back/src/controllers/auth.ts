import { Application } from 'express';
import * as Usuario from '../domain/Usuario';

const routes: Array<(app: Application) => void> = [
  app =>
    app.post('/auth', async (req, res) => {
      if (req.body.nome && req.body.senha) {
        const { nome, senha } = req.body;
        const usuario = await Usuario.findByNome(nome);
      }
    }),
];

export default routes;
