import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import Styles from './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize('UA-47078105-7', {
  gaOptions: { cookieFlags: 'max-age=7200;secure;samesite=none' },
});

ReactDOM.render(<App style={Styles} />, document.querySelector('#root'));
serviceWorker.register();
