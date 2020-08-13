import React, { useContext, useState, useEffect } from 'react';
import CheckedIn from '../../components/CheckedIn';
import MemberList from '../../components/MemberList';
import VideoComponent from '../../components/VideoComponent';

import { UserContext } from '../../contexts/user';
import { EventContext } from '../../contexts/event';

import './index.css';

import socketio from 'socket.io-client';

const MainPage = () => {

  const user = useContext(UserContext);
  const events = useContext(EventContext);

  const users = events.users;

  const [token, setToken] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [roomUsers, setRoomUsers] = useState(null);

  const socket = socketio.connect('http://localhost:8080');

  useEffect(() => {
    setRoomUsers(users);
    socket.emit('toServer', { id: user.user.id });
  }, [])

  socket.on('broadcast', (ids) => {
    if (roomUsers) {
      let tmp = [];
      roomUsers.map((o) => {
          let tmpo = o;
        ids.forEach((i) => {
          if (o.id === i) {
            tmpo.checked_in_at = true;
          }
        })
        tmp.push(tmpo);
      })
      events.setEvent({
        users: tmp
      })
      setRoomUsers(tmp);
    }
  });

  const saveInfo = (t, r) => {
    setToken(t);
    setRoomName(r);
  }

  return (
    <div className='main'>
      {/*<h1 style={{color: 'white'}}>{user.user.id}</h1>*/}
      <div className="members-offline">
      {
        roomUsers && roomUsers.map((data, index) => {
              return !data.checked_in_at && <MemberList key={index} data={data}/>
            }
        )}
      </div>
      <div className='room'>
        <VideoComponent token={token} roomName={roomName} />
      </div>
      <div className="title">
        SPEAKER CHECK-IN-VIDEO & TEXT CHAT
      </div>
      <div className="checked-in-status">
        <div className="checked-in">
          <CheckedIn />
          <p>
            Online
          </p>
        </div>
      </div>
      <div className="members">
        {
          roomUsers
          ?
          roomUsers.map((data, index) =>{
            return data.checked_in_at  && <MemberList key={index} data={data} saveInfo={saveInfo}/>
            })
          :
          <p></p>
        }
      </div>
    </div>
  );
}
 
export default MainPage;