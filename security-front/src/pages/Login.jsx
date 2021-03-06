import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

/**
 * [Segurança] No componente login, caso haja alguma falha na autenticação, o usuário não deve ter feedback do campo exato que causou a falha,
 * ou ainda se o usuário sequer existe. (Ataque de força bruta)
 */

const useStyles = makeStyles(theme => ({
  root: {
    height: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: '5%',
    },
  },
  card: {
    minWidth: 275,
  },
}));

async function entrar(usuario, senha, setToken, openSnack) {
  const res = await fetch('http://localhost:8080/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome: usuario, senha }),
  });
  if (!res.ok) {
    const msg = (await res.json()).message;
    openSnack(msg, 'error');
    return;
  }
  setToken((await res.json()).token);
}

export default function({ openSnack }) {
  const classes = useStyles();
  const { token, setToken } = useContext(AuthContext);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  return token !== '' ? (
    <Redirect to={'/'} />
  ) : (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Login
          </Typography>
          <form>
            <div>
              <TextField
                label="Nome de usuário"
                variant="outlined"
                value={usuario}
                onChange={event => setUsuario(event.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                value={senha}
                onChange={event => setSenha(event.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={event => {
                  event.preventDefault();
                  entrar(usuario, senha, setToken, openSnack);
                }}
              >
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
