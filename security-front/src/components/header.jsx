import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function ConditionalButton() {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();
  if (token === '') {
    return <Button color="inherit">Login</Button>;
  }
  return (
    <Fragment>
      <Button color="inherit" onClick={() => history.push('/')}>
        Dashboard
      </Button>
      <Button color="inherit" onClick={() => setToken('')}>
        Logout
      </Button>
    </Fragment>
  );
}

export default function() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Security App
          </Typography>
          <ConditionalButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
