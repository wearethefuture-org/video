import React, { useContext } from 'react';
import CheckedIn from '../CheckedIn';
import NotChekcedIn from '../NotCheckedIn';
import defaultProfilePhoto from '../../assets/images/default_profile_photo.jpg';

import { UserContext } from '../../contexts/user';

import './index.css';
import { getToken } from '../../services';

import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:8080');

const MemberList = (props) => {
  
  const { data, saveInfo } = props;
  const user = useContext(UserContext);

  socket.on('broadcastVideo', (data) => {
    const local = data.local;
    const remote = data.remote;
    const roomName = local.toString() + "vs" + remote.toString();
    if (remote === user.user.id) {
      getToken(user.user.id, roomName).then((res) => {
        saveInfo(res.token, roomName);
      }).catch((err) => {
        console.log(err);
      })
    }
  });

  const handleVideoChat = async () => {
    const localUser = user.user.id;
    const remoteUser = data.id;
    const roomName = localUser.toString() + "vs" + remoteUser.toString();

    socket.emit('askVideo', { local: user.user.id, remote: data.id });
    
    getToken(user.user.id, roomName).then((res) => {
      saveInfo(res.token, roomName);
    }).catch((err) => {
      console.log(err);
    })

  }

  const isOnline = data.checked_in_at;

  return (
        <div className={isOnline ? "member" : "member member_offline"}>
          {
            isOnline
                ?
                <CheckedIn/>
                :
                null
            // <NotChekcedIn />
          }
          <div className={isOnline ? "member_box" : "member_box_offline"}>
            <div>
              {
                isOnline &&
                <div className="profile_img">
                  <img src={data.profile_picture || defaultProfilePhoto} alt="Profile" />
                </div>
              }
              <div className={isOnline? "member_info" : "member_info_offline"}>
                {/*<p>*/}
                {/*  {data.id}*/}
                {/*</p>*/}
                <p>
                  {`${data.first_name} ${data.last_name}` || 'none'}
                </p>
                <p>
                  {data.job_title || 'none'}
                </p>
                <p>
                  {data.company || 'none'}
                </p>
              </div>
            </div>
            {
              isOnline
                  ?
                  <div>
                    <button className="checkedInBtn">Text Chat</button>
                    <button className="checkedInBtn" onClick={handleVideoChat}>Video Chat</button>
                  </div>
                  : null
              //<div>
              //<button className="notCheckedInBtn" onClick={handleVideoChat}>MEET</button>
              //<button className="notCheckedInBtn">CHAT</button>
              //</div>
            }
          </div>
        </div>
  );
}
 
export default MemberList;