import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './components/Index';
import Game from './components/Game';

const routes = (
  <Route path='/' component={Index}>
    <IndexRoute component={Game} />
  </Route>
);

export default routes;
