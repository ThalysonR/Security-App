import React from 'react';
import Header from './components/header';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <AuthGuard exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
