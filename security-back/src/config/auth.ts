import passport from 'passport';
import passportJwt from 'passport-jwt';
import * as Usuario from '../domain/Usuario';

export const authParams = {
  secretOrKey: 'MY_SECRET_KEY',
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

let authInstance;

export default () => {
  if (authInstance != null) {
    return authInstance;
  }

  const strategy = new passportJwt.Strategy(authParams, async (payload, done) => {
    const usuario = (await Usuario.getOne(payload.id)) || null;
    if (usuario) {
      return done(null, { id: usuario.id });
    } else {
      return done(new Error('Usuário não encontrado'), null);
    }
  });
  passport.use(strategy);
  authInstance = {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
  return authInstance;
};
