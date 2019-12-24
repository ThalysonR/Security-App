import React, { useReducer, useEffect } from 'react';

const reducer = (token, newToken) => newToken;

const initialState = '';

const localState = localStorage.getItem('token');

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [token, setToken] = useReducer(reducer, localState || initialState);
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken }}>{props.children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
