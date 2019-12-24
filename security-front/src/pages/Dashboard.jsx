import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../components/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    height: '80%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: '30px 0',
    '& .MuiTextField-root': {
      margin: '5%',
    },
  },
  card: {
    minWidth: 375,
    margin: '20px 0',
  },
}));

function enviarComentario(comentario, authToken, comentarios, setComentarios) {
  fetch('http://localhost:8080/comentarios', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    method: 'POST',
    body: JSON.stringify({ comentario }),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Erro');
    })
    .then(res => {
      const newComentarios = comentarios.slice();
      newComentarios.push(res);
      setComentarios(newComentarios);
    });
}

function loadComentarios(authToken, setComentarios) {
  fetch('http://localhost:8080/comentarios', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Erro');
    })
    .then(res => {
      console.log(res);
      setComentarios(res);
    });
}

export default function() {
  const classes = useStyles();
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    loadComentarios(token, setComentarios);
  }, [token]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Novo Comentário
          </Typography>
          <form>
            <div>
              <TextField
                variant="outlined"
                multiline
                rowsMax="4"
                value={comentario}
                onChange={event => setComentario(event.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={event => {
                  event.preventDefault();
                  enviarComentario(comentario, token, comentarios, setComentarios);
                }}
              >
                Enviar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {comentarios.map(obj => (
        <Card className={classes.card} key={obj.comentario.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {obj.usuario.nome}
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: obj.comentario.comentario }}
            ></Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
