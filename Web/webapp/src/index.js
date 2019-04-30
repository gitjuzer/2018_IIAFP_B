import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import SLogin from './pages/SLogin';
import SRegister from './pages/SRegister';
import TLogin from './pages/TLogin';
import TRegister from './pages/TRegister';
import Error from './pages/404';
import DashboardStudent from './loginedDashboard/index';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login/student" component={SLogin} />
            <Route path="/register/student" component={SRegister} />
            <Route path="/login/teacher" component={TLogin} />
            <Route path="/register/teacher" component={TRegister} />
            <Route path="/DashboardStudent" component={DashboardStudent} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));