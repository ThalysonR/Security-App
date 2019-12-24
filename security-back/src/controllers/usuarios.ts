import { Application } from 'express';
import * as UsuarioDao from '../domain/Usuario';
import { constraints } from '../models/Usuario';
import auth from '../config/auth';
import validate from 'validate.js';

const routes: Array<(app: Application) => void> = [
  app =>
    app.post('/usuarios', async (req, res) => {
      const error = validate(req.body, constraints);
      if (!error) {
        const usuario = await UsuarioDao.createUsuario(req.body);
        res.status(201).json(usuario);
      } else {
        res.status(400).json(error);
      }
    }),
  app =>
    app.get('/usuarios', auth().authenticate(), async (req, res) => {
      res.json(
        await UsuarioDao.findAll().then(usuarios =>
          Array.from(usuarios).map(usuario => ({ ...usuario, senha: null })),
        ),
      );
    }),
];
export default routes;
