import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import VideoComponent from '.';

const Room = ({ roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!roomName || !token) {
      return;
    }

    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  if (!roomName || !token || !room) {
    return <VideoComponent />;
  }

  const remoteParticipants = participants.map((participant, index) => {
    return (
      <Participant key={index} participant={participant} />
    )
  });

  return <VideoComponent
    localParticipant={room.localParticipant}
    remoteParticipants={remoteParticipants}
  />;
};

export default Room;
