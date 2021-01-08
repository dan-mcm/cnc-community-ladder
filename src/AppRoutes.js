import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import Home from './containers/Home';
import Social from './containers/Social';
import Ladder from './containers/Ladder';
import Tournaments from './containers/Tournaments';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

const history = createHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export default class AppRoutes extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={history}>
        <Nav />
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/ladder" component={Ladder} />
          <Route exact path="/social" component={Social} />
          <Route exact path="/tournaments" component={Tournaments} />
        </div>
        <Footer />
      </Router>
    );
  }
}
