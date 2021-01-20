import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import Home from './containers/Home';
import Social from './containers/Social';
import Ladder from './containers/Ladder';
import Tournaments from './containers/Tournaments';
import Streamers from './containers/Streamers';
import Recent from './containers/Recent';
import Footer from './components/Footer';
import Nav from './components/Nav';
import CookieBanner from 'react-cookie-banner';

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
        <CookieBanner
          message="By continuing you consent to using 🍪 for site analytics purposes only."
          cookie="user-has-accepted-cookies"
          onAccept={() => {}}
        />
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/ladder" component={Ladder} />
          <Route exact path="/social" component={Social} />
          <Route exact path="/tournaments" component={Tournaments} />
          <Route exact path="/streamers" component={Streamers} />
          <Route exact path="/recent" component={Recent} />
        </div>
        <Footer />
      </Router>
    );
  }
}
