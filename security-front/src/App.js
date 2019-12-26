import React, { useState } from 'react';
import Header from './components/header';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import CustomSnackbarContent from './components/CustomSnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

function App() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState('');
  const [msg, setMsg] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const openSnack = (message, variant) => {
    setMsg(message);
    setVariant(variant);
    setOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <AuthGuard openSnack={openSnack} exact path="/" component={Dashboard} />
          <Route path="/login" render={props => <Login {...props} openSnack={openSnack} />} />
          <Route path="/cadastro" render={props => <Cadastro {...props} openSnack={openSnack} />} />
        </Switch>
      </Router>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <CustomSnackbarContent onClose={handleClose} variant={variant} message={msg} />
      </Snackbar>
    </AuthProvider>
  );
}

export default App;
