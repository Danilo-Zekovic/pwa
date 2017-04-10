import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
/*const App = () => (
  <div>
    <h1>Hello World</h1>
  </div>
);*/

render(
  //<App />,
  (<BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('main'),
);
