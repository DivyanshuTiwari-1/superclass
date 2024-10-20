"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:3000'); // Backend server URL

const LiveClass = ({ roomId }) => {
  const [peers, setPeers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const userVideo = useRef();
  const peersRef = useRef([]);
  const room = roomId;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;

      socket.emit('join-room', room, socket.id);

      socket.on('user-connected', userId => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current.push({
          peerID: userId,
          peer,
        });
        setPeers(users => [...users, peer]);
      });

      socket.on('receive-message', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });

      socket.on('user-disconnected', userId => {
        const peerObj = peersRef.current.find(p => p.peerID === userId);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        setPeers(users => users.filter(p => p.peerID !== userId));
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('send-signal', { userToSignal, callerID, signal });
    });

    return peer;
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message', message, room);
    setMessages(prevMessages => [...prevMessages, message]);
    setMessage('');
  };

  const handleScreenShare = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    socket.emit('share-screen', stream, room);
  };

  return (
    <div>
      <div>
        <video ref={userVideo} autoPlay muted />
        {peers.map((peer, index) => (
          <PeerVideo key={index} peer={peer} />
        ))}
      </div>
      <div>
        <form onSubmit={handleSendMessage}>
          <input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Send a message" 
          />
          <button type="submit">Send</button>
        </form>
        <button onClick={handleScreenShare}>Share Screen</button>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const PeerVideo = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video ref={ref} autoPlay controls/>;
};

export default LiveClass;
