import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@components/App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
