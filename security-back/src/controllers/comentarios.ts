import { Application } from 'express';
import auth from '../config/auth';
import * as ComentariosDao from '../domain/Comentarios';
import * as UsuariosDao from '../domain/Usuario';

const routes: Array<(app: Application) => void> = [
  app =>
    app.post('/comentarios', auth().authenticate(), async (req, res) => {
      const c_id = await ComentariosDao.createComentario({
        id_usuario: req['user']['id'],
        comentario: req.body.comentario,
      });
      if (c_id[0] && c_id[0] > 0) {
        const usuario = await UsuariosDao.getOne(req['user']['id']);
        res.json({
          comentario: {
            id: c_id,
            comentario: req.body.comentario,
          },
          usuario: { ...usuario, senha: null, id: null },
        });
      }
    }),
  app =>
    app.get('/comentarios', auth().authenticate(), async (req, res) => {
      const comentarios = await ComentariosDao.getAll();
      res.json(
        await Promise.all(
          Array.from(comentarios).map(async comentario => {
            const usuario = await UsuariosDao.getOne(comentario.id_usuario);
            return { comentario, usuario: { ...usuario, senha: null, id: null } };
          }),
        ),
      );
    }),
];

export default routes;
