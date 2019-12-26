import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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

async function salvar(usuario, senha, history, openSnack) {
  const res = await fetch('http://localhost:8080/usuarios', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome: usuario, senha }),
  });
  if (!res.ok) {
    openSnack('Falha ao cadastrar', 'error');
  }
  history.push('/');
}

export default function({ openSnack }) {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  return token !== '' ? (
    <Redirect to={'/'} />
  ) : (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Cadastro
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
                  salvar(usuario, senha, history, openSnack);
                }}
              >
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
