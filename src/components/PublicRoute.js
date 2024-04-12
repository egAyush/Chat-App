// import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
