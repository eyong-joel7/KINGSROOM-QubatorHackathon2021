import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import {
  AddToQueue,
  ArrowForward,

  PhoneDisabled,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../Context";
import NotificationModal from "./Modals";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "auto",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 10,
  },
  paper: {
    padding: "10px 20px",
  },
}));

const Card = (props) => {
  const { children, join, host } = props;
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [message, setMessage] = useState("");
  const [myStream, setMyStream] = useState(null);
  const {
    roomid,
    callAccepted,
    name,
    setName,
    setStream,
    myVideo,
    callEnded,
    leaveCall,
    users,
    setRoomID,
  } = useContext(SocketContext);

  const videoConstraints = {
    height: window.innerHeight / users?.length+1,
    width: window.innerWidth / users?.length+1
  };

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setName(storedName);
    } 
    if (myStream && host) {
      setLoading(false);
      // myVideo.current.srcObject = myStream;
     roomid && history.push(`/conference-room`);
    };
    if(myStream && join ) {
      setLoading(false)
      // myVideo.current.srcObject = myStream;
      history.push(`/conference-room`)
    }

  }, [callAccepted, history, host, join, myStream, myVideo, roomid, setName]);

// useEffect(()=>{
//   return () => {
//     if (myStream) {
//       myStream.getTracks() &&
//         myStream.getTracks().forEach((track) => track.stop());
//         setStream(null);
//     }
//   };
// },[myStream, setStream])

  const handleClose = () => setShow(false);

  const classes = useStyles();

  const joinMeeting = (idToCall) => {
    if (name ) {
      localStorage.setItem("firstName", name);
      if (!isJoin && idToCall !== "") {
        setIsJoin(true);
        setRoomID(idToCall);
        getUserMedia();
      } else {
        setShow(true);
        setMessage("ID of the Meeting you want to join is required");
      }
    } else {
      setShow(true);
      setMessage(`Name is required`);
    }
  };

  const getUserMedia = () => {
    const constraints = (window.constraints = {
      audio: true,
     video: videoConstraints
    });
    setLoading(true);
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        // console.log('stream', stream.getVideoTracks())
        // let videoTracks = stream.getVideoTracks();
        // let audioTracks = stream.getAudioTracks();
        // console.group("Media Info");
        // console.log("Got stream with constraints:", constraints);
        // console.log("Using video device: " + videoTracks[0].label);
        // console.log("Using audo device: " + audioTracks[0].label);
        // console.groupEnd();
        stream.onremovetrack = function () {
          console.log("Stream ended");
        };
        setStream(stream);
        setMyStream(stream);
  
      })
      .catch(function (error) {
        setLoading(false);
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
  };

  const startMeeting = () => {
    copyID();
    if (roomid) {
      setRoomID(roomid)
      getUserMedia();
      } else {
        setShow(true);
        setMessage("ID of the Meeting you want to join is required");
      }
  };

  const copyID = () => {
    if (name && roomid) {
      setIsCopied(true)
    } else {
      setShow(true);
      setMessage(`Name and/ MeetingID is Required`);
    }
  };
  return (
    <>
      <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.gridContainer}>
              {host && (
                <Grid item className={classes.padding}>
                  <Typography gutterBottom variant="h6">
                    Meeting Info
                  </Typography>
                  <TextField
                    label="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Room ID"
                    value={roomid}
                    onChange={(e) => {setRoomID(e.target.value)}}
                    fullWidth
                  />
                  {/* {!isCopied ? (
                    <CopyToClipboard text={roomid} className={classes.margin}>
                      <Button
                        onClick={() => copyID()}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        startIcon={<Assignment fontSize="small" />}
                      >
                        {`Copy & Share Your ID`}
                      </Button>
                    </CopyToClipboard>
                  ) : (
                    <Button
                      className={classes.margin}
                      onClick={() => startMeeting()}
                      variant="contained"
                      color="primary"
                      fullWidth
                      endIcon={!loading && <ArrowForward fontSize="large" />}
                    >
                      {loading ? "Starting ..." : "Start Meeting"}
                    </Button>
                  )} */}
                    <Button
                      className={classes.margin}
                      onClick={() => startMeeting()}
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled = {isCopied}
                      endIcon={!loading && <ArrowForward fontSize="large" />}
                    >
                      {loading ? "Starting ..." : "Start Meeting"}
                    </Button>
                </Grid>
              )}

              {join && (
                <Grid item xs={12} md={6} className={classes.padding}>
                  <Typography gutterBottom variant="h6">
                    Join Meeting
                  </Typography>
                  <TextField
                    label="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Meeting ID"
                    value={idToCall}
                    required
                    onChange={(e) => setIdToCall(e.target.value)}
                    fullWidth
                  />
                  {(callAccepted && !callEnded) || isJoin ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PhoneDisabled fontSize="large" />}
                      fullWidth
                      onClick={leaveCall}
                      className={classes.margin}
                    >
                      Joining...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => joinMeeting(idToCall)}
                      className={classes.margin}
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddToQueue fontSize="large" />}
                    >
                      JOIN
                    </Button>
                  )}
                </Grid>
              )}
            </Grid>
          </form>
          {children}
        </Paper>
      </Container>
      {show && (
        <NotificationModal
          show={show}
          handleClose={handleClose}
          message={message}
        />
      )}
    </>
  );
};

export default Card;
