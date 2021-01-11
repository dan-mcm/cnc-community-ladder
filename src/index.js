import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import Styles from './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const dotenv = require('dotenv').config();

ReactGA.initialize([{ trackingId: process.env.GA }]);

ReactDOM.render(<App style={Styles} />, document.querySelector('#root'));
serviceWorker.register();
