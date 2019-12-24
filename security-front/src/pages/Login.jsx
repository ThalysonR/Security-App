import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

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

function entrar(usuario, senha, setToken) {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome: usuario, senha }),
  };
  fetch('http://localhost:8080/auth', opts)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Falha na autenticação');
    })
    .then(res => {
      setToken(res.token);
    });
}

export default function() {
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
                  entrar(usuario, senha, setToken);
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
