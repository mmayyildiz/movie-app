import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import Detail from './components/Detail/Detail';
import NoMatch from './components/NoMatch/NoMatch';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="app-header">
          <Link className="navigate"
            to='/'
          >
            <h1>THE MOVIE DB</h1>
          </Link>
        </div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/dashboard/:initialSearchKey" component={Dashboard} />
          <Route exact path="/detail" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
