import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// import HomePage from './containers/HomePage';
import LogIn from './containers/LogIn';
import MainPage from './containers/MainPage';

import { EventContext } from './contexts/event';
import { getEventLists } from './services/index';

import MainRoute from './routes/MainRoute';
import AuthRoute from './routes/AuthRoute';
// import WelcomeRoute from './routes/WelcomeRoute';
import Error from "./routes/Error";
function App() {

  const events = useContext(EventContext); 

  useEffect(() => {
    getEventLists()
    .then(res => {
      console.log(res)
      events.setEvent({
        events: res.lists
      })
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <Router>
      <Switch>
        {/*<WelcomeRoute exact path="/" component={HomePage} />*/}
        <AuthRoute path="/login" component={LogIn} />
        <MainRoute path="/room" component={MainPage} />
        <Route path="/error" component={Error} exact/>
        <Redirect to='/login' />
      </Switch>
    </Router>
  );
}

export default App;
