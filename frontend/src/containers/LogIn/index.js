import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../../contexts/event';
import { UserContext } from '../../contexts/user';
import { withRouter } from 'react-router-dom'

import './index.css';

const LogIn = React.memo((props) => {

  const events = useContext(EventContext);
  const user = useContext(UserContext);
  useEffect(()=>{
    let obj = events.users.find(o => o.email === user.email);
    if(!events.roomId) return;
    if (obj) {
      // obj.checked_in_at = true;
      user.setUser({
        user: obj,
        loggedIn: true,
      })
      props.history.push(`/room/${events.roomId}`)
    } else {
      // props.history.push('/error')
    }
  },[events.roomId])

  return (
      <div className="login">

      </div>
  );
})

export default  withRouter(LogIn);