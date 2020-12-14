import * as React from 'react';
import {useAuth} from './auth';
import { Redirect } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return children;
}

export { ProtectedRoutes };
