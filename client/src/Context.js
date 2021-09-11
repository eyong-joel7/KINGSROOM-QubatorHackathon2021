import React, { createContext, useState, useRef, useEffect,  } from 'react';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const URL = 'https://kings-video-conferencing.herokuapp.com/';
// const socket = io(URL);


const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [roomid, setRoomID] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [peers, setPeers] = useState([]); //pass this peers to the context, use it in card to get number of users
  const socketRef = useRef();
  const peersRef = useRef([]);
  const myVideo = useRef();
  const userVideo = useRef();
  // const socketRef = useRef(); //used as peerRef
  // 'http://localhost:5000/'
  const main__mute_button = useRef();
  const main__video_button = useRef();
  useEffect(() => {
    socketRef.current = io(URL) 
    if(stream && roomid){
    const roomID = roomid.trim().toLowerCase();
    socketRef.current.emit('join room', {roomID, name}, (error) => {
      if(error) {
        setCallAccepted(false)
        alert(error + " Please Go back and take another user name");
      }
    else{
      setCallAccepted(true)
    }});
      socketRef.current.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socketRef.current.on("roomData", ({ users }) => {
        setUsers(users);
        console.log('i am in roomdata')
      });
    socketRef.current.on('all users', users => {
      const peers = [];
      users.forEach(userID => {
        const peer = createPeer(userID, socketRef.current.id, stream, name);
        peersRef.current.push({
          peerID: userID,
          peer
        })
        peers.push({
          peerID: userID,
          peer});
      }
        )
        setPeers(peers);
    })
        socketRef.current.on('user joined', payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })
          const peerObj = {
            peer, 
            peerID: payload.callerID
          }
          setPeers(users => [...users, peerObj])
        });

        socketRef.current.on('receiving return signal', payload =>{
          const item = peersRef.current.find(p => p.peerID = payload.id);
          item.peer.signal(payload.signal);
          setCallAccepted(true); //added
        });
        socketRef.current.on('user left', id => {
          const peerObj = peersRef.current.find(p => p.peerID === id);
          if(peerObj){
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter(p => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        })
   
      }
    // old logic
    // socket.on('me', (id) => setRoomID(id));
    // socket.on('callUser', ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
  
  }, [name, roomid, stream]);


const sendMessage = (event) => {
  event.preventDefault();
  if(message) {
    const user = users.find(user => user.name.trim().toLowerCase === name.trim().toLowerCase())
    socketRef.current.emit('sendMessage', {message, userID:user?.id }, () => setMessage(''));
  }
}

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

const addPeer = (incomingSignal, callerID, stream,)=>{
const peer = new Peer({
  initiator: false,
  trickle: false,
  stream
})

peer.on('signal', signal => {
socketRef.current.emit('returning signal', {signal, callerID})
} );



peer.signal(incomingSignal);
setCallAccepted(true); //added
return peer;
}

// refactor to addPeer
  const answerCall = () => {
    setCallAccepted(true);
  //   const peer = new Peer({ initiator: false, trickle: false, stream });

  //   peer.on('signal', (data) => {
  //     socket.emit('answerCall', { signal: data, to: call.from });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //  socketRef.current = peer;
  };
// we can refactor this to Join room
  const callUser = (id) => {
 

  //   const peer = new Peer({ initiator: true, trickle: false, stream });
  //   peer.on('signal', (data) => {
  //     socket.emit('callUser', { userToCall: id, signalData: data, from: roomid, name });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   socket.on('callAccepted', (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //  socketRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socketRef.current.destroy();
  window.location.replace('/')
  };
  const muteUnmute = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      stream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const playStop = () => {

    let enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      stream.getVideoTracks()[0].enabled = true;
    }
  }
  
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    main__mute_button.current.innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    main__mute_button.current.innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    main__video_button.current.innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    main__video_button.current.innerHTML = html;
  }

  return (
    <SocketContext.Provider
      value={{
        callAccepted,
        myVideo,
        userVideo,
        setStream,
        stream,
        name,
        setName,
        callEnded,
        roomid,
        setRoomID,
        peers,
        callUser,
        leaveCall,
        answerCall,
        playStop,
        message,
        setMessage,
        messages,
        users,
        call,
        setCall,
        sendMessage,
        muteUnmute,
        main__mute_button,
        main__video_button,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
