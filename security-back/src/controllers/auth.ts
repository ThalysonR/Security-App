import { Application } from 'express';
import * as Usuario from '../domain/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authParams } from '../config/auth';

/**
 * [Segurança] Criamos um token criptografado com HMAC onde inserimos apenas o ID.
 * Método de autenticação: JWT
 */
const routes: Array<(app: Application) => void> = [
  app =>
    app.post('/auth', async (req, res) => {
      if (req.body.nome && req.body.senha) {
        const { nome, senha } = req.body;
        const usuario = await Usuario.findByNome(nome);
        console.log(usuario);
        if (!usuario) {
          res.status(401).json({ message: 'Login inválido' });
          return;
        }
        const correctPw = bcrypt.compareSync(senha, usuario.senha);
        if (correctPw) {
          const token = jwt.sign({ id: usuario.id }, authParams.secretOrKey, {
            expiresIn: 300,
          });
          res.status(200).json({ auth: true, token });
        } else {
          res.status(401).json({ message: 'Login inválido' });
        }
      }
    }),
  app =>
    app.post('/logout', (req, res) => {
      res.status(200).send({ auth: false, token: null });
    }),
];

export default routes;
