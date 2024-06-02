import {chakraProvider} from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <chakraProvider>
    <Router>
      <App />
    </Router>
  </chakraProvider>
);


