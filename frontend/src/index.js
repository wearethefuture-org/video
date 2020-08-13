import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { EventProvider } from './contexts/event';
import { UserProvider } from './contexts/user';
import socketio from 'socket.io-client';

ReactDOM.render(
  <React.StrictMode>
    <EventProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </EventProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
