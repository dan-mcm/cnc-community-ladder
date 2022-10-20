import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import CookieBanner from 'react-cookie-banner';
import { Home, Social, Ladder, Tournaments, Streamers, Recent } from './containers';
import Footer from './components/Footer';
import Nav from './components/Nav';


const history = createBrowserHistory();
history.listen((location) => {
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
