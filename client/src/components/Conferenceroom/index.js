import { makeStyles } from '@material-ui/core';
import Chat from '../ChatComponents/Chat/Chat'
import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import MainControls from '../MainControls';
import VideoStreams from '../VideoStreams';
import './conferenceElements.css'
import Participants from '../Participants';
import { useLocation, useHistory} from "react-router-dom";


// socket imports
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import NotificationModal from '../Modals';
// const URL = 'https://kings-video-conferencing.herokuapp.com/';

const videoConstraints = {
  height: window.innerHeight /2,
  width: window.innerWidth /2
};

const ConferenceRoom = (props) => {
  const location = useLocation();
 const history  = useHistory();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState(null);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [peers, setPeers] = useState([]); //pass this peers to the context, use it in card to get number of users
  const socketRef = useRef();
  const peersRef = useRef([]);
  const myVideo = useRef();


  const main__mute_button = useRef();
  const main__video_button = useRef();
  const userName = location.state?.name;
  const room = location.state?.roomid;
  const roomID = room?.trim().toLowerCase();

  useEffect(() => { 
    if(!roomID || !userName){
   history.push('/');
   return
    }
    socketRef.current = io.connect('/');
    const constraints = (window.constraints = {
      audio: true,
     video: videoConstraints
    });
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        myVideo.current.srcObject = stream;
        stream.onremovetrack = function () {
          console.log("Stream ended");
        };
        setStream(stream)
          socketRef.current.emit('join room', {roomID, userName}, (error) => {
            if(error) {
             setErrorMessage(error + " Please Go back and take another user name");
            }
        });
            socketRef.current.on('message', message => {
              setMessages(messages => [ ...messages, message ]);
            });
            
            socketRef.current.on("roomData", ({ users }) => {
              setUsers(users);
              console.log('use', users)
            });
          socketRef.current.on('all users', users => {
            const peers = [];
            users.forEach(userID => {
              const peer = createPeer(userID, socketRef.current.id, stream);
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
                // setCallAccepted(true); //added
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
         
            
      })
      .catch(function (error) {
        setShow(true);
        if (error.name === "ConstraintNotSatisfiedError") {
          setMessage(
            "The resolution " +
              constraints.video.width.exact +
              "x" +
              constraints.video.height.exact +
              " px is not supported by your device."
          );
        } else if (error.name === "PermissionDeniedError") {
          setMessage(
            "Permissions have not been granted to use your camera and " +
              "microphone, you need to allow the page access to your devices"
          );
        }
       else setMessage("getUserMedia error: " + error.name + `error: ${error}` );
      });
  }, [history, roomID, userName]);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      const user = users.find(user => user.name.trim().toLowerCase === userName.trim().toLowerCase())
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
  
  const addPeer = (incomingSignal, callerID, stream)=>{
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream
  })
  
  peer.on('signal', signal => {
  socketRef.current.emit('returning signal', {signal, callerID})
  } );
  

  peer.signal(incomingSignal);
  // setCallAccepted(true); //added
  return peer;
  }

  const leaveCall = () => {
    // setCallEnded(true);
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
    const [isToggled, setIsToggled] = useState(false);
    const [selected, setSelected] = useState('');
    const hiddenClass = useMediaQuery({
      query: '(min-device-width: 1200px)',
    });
    const toggleHamburger = () => {
      setIsToggled(!isToggled);
    };
  
  const closeNav = ()=>{
    if((!hiddenClass && isToggled)){
    toggleHamburger();
    }
  }
  const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: "30px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
  
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    image: {
      marginLeft: "15px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: '100%',
   
    },
  }));
  const classes = useStyles();
    return (
      <div>
        <div className="conference video_app__container">
          <nav
            className={
              !isToggled
                ? "conference video_app__nav primary-and-secondary hidden"
                : "conference video_app__nav primary-and-secondary"
            }
          >
            <div className="nav__contents">
              {selected === "chat" ? (
                <Chat toggleControls={toggleHamburger} sendMessage = {sendMessage} roomid = {roomID} message = {message} messages = {messages} setMessage = {setMessage} name = {userName} />
              ) : selected === "users" ? (
                 <Participants toggleControls={toggleHamburger} users = {users}/>
              ) : null}
            </div>
          </nav>
          <main className=" conference video_app__main">
            <div className="conference title-area">
              <div className="conference video_app__header">
                <div>
                  <div>
                    <div className="_header-content--header--3mdiS shared--outer-container--3eppq">
                      <div className="_header-content--part-info--3iVwL">
                        <h1>Kingsroom</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Put video thumbnail here */}
            <div
              className="content-area"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <div aria-hidden="true" className="hidden-header">
                <div className="video_app__header">
                  <div>
                    <div>
                      <div className="_header-content--header--3mdiS shared--outer-container--3eppq">
                        <div className="_header-content--part-info--3iVwL">
                          <h1>Kings' Room</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="content"
                className="video_app__body"
                onClick={() => closeNav()}
              >
                <div className="index--container--uI0r1">
                  <div className="index--body--3G2lS">
                    <div className={classes.wrapper}>
                      <VideoStreams peers = {peers} myVideo = {myVideo}/>
                    </div>
                  </div>
                  <span className="footer-link--footer-link--3EuAW">
                    <div className="footer-link--contents--1AXQE shared--outer-container--3eppq">
                      <MainControls toggleHamburger={toggleHamburger} setSelected = {setSelected} playStop = {playStop} muteUnmute = {muteUnmute} leaveCall = {leaveCall} main__mute_button = {main__mute_button}  main__video_button = {main__video_button} stream = {stream} users = {users}/>
                    </div>
                  </span>
                </div>
              </div>
            </div>{" "}
          </main>{" "}
        </div>
        {show && (
        <NotificationModal
          show={show}
          handleClose={() => setShow(false)}
          message= {errorMessage}
        />
      )}
      </div>
    );
}

export default ConferenceRoom
