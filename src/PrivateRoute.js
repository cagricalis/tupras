// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
