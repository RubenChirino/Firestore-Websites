import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

//Css Notifications
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import NotFound from './pages/notFound';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/" component={Home} />

        <Route component={NotFound} />
  
      </Switch>
    </Router>
  );
}

export default App;

