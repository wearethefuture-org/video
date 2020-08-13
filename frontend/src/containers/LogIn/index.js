import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../../contexts/event';
import { UserContext } from '../../contexts/user';

import { getEventsMembers } from '../../services/index';

import './index.css';

const LogIn = (props) => {
  const events = useContext(EventContext);
  const user = useContext(UserContext);

  const [email, setEmail] = useState('majorships@johonkemana.com');
  const [eventId, setEventId] = useState(0);

  const lists = events.events;

  useEffect(() => {
    getEventsMembers(user.event_id)
    .then(res => {
      events.setEvent({
        users: res.lists,
        roomId: user.event_id
      })
    })
    .catch(err => console.log(err))
  }, [])

  const handleChange = (event) => {
    setEmail(event.target.value);
    setEventId(event.target.value);

    const event_id = lists[eventId].id;
    user.setUser({
      event_id: event_id
    })
    props.history.push('/login')
  }

  const login = (event) => {
    event.preventDefault();
    let obj = events.users.find(o => o.email === email);
    if(obj) {
      // obj.checked_in_at = true;
      user.setUser({
        user: obj,
        loggedIn: true,
      })
      
      props.history.push(`/room/${events.roomId}`)
    }
    else {
      alert('You are not registered in this event!')
    }
  }

  return (
    <div className="login">
      {
        !events.users.length
        ?
        <p>Please Wait...</p>
        :
        <p></p>
      }
      <form onSubmit={login}>
        <input type="email" name="email" value={email} onChange={handleChange} required/>
        <div className="btn">
          <button>LogIn</button>
        </div>
      </form>
    </div>
  );
}
 
export default LogIn;