import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';
export default function(props) {
  const { token } = useContext(AuthContext);
  const Component = props.component;
  if (token !== '') return <Component {...props}></Component>;
  return <Redirect to={'/login'} />;
}
