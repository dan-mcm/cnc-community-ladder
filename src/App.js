import React from 'react';
import AppRoutes from './AppRoutes';
import Styles from './App.css';
const dotenv = require('dotenv').config();

function App() {
  return (
    <div className="App" style={Styles}>
      <AppRoutes />
    </div>
  );
}

export default App;
