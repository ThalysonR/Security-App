import passport from 'passport';
import passportJwt from 'passport-jwt';
import * as Usuario from '../domain/Usuario';

const params = {
  secretOrKey: 'MY_SECRET_KEY',
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
};

export default () => {
  const strategy = new passportJwt.Strategy(params, async (payload, done) => {
    const usuario = (await Usuario.getOne(payload.id)) || null;
    if (usuario) {
      return done(null, { id: usuario.id });
    } else {
      return done(new Error('Usuário não encontrado'), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
