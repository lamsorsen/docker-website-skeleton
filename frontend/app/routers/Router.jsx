import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from '../components/MainPage';

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
