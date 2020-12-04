import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import Styles from './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize([{ trackingId: 'default_google_analytics_code' }]);

ReactDOM.render(<App style={Styles} />, document.querySelector('#root'));
serviceWorker.register();
