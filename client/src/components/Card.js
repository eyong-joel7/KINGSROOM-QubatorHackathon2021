import React, { useState, useEffect } from "react";
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
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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
  const [idToCall, setIdToCall] = useState("");
 
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');


  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setName(storedName);
    }

  }, []);


  const handleClose = () => setShow(false);

  const classes = useStyles();



  const joinMeeting = (idToCall) => {
    if (name && idToCall) {
      localStorage.setItem("firstName", name);
      idToCall &&
      history.push({
        pathname: `/conference-room/${(idToCall).replace(/\s+/g, '')}`,
        state: { roomid: (idToCall).replace(/\s+/g, ''), name: name },
      });
    } else {
      setShow(true);
      setMessage(`Name and/ MeetingID is Required`);
    }
  };
  const startMeeting = () => {
    if (name && idToCall) {
      localStorage.setItem("firstName", name);
      idToCall &&
      history.push({
        pathname: `/conference-room/${(idToCall).replace(/\s+/g, '')}`,
        state: { roomid:  (idToCall).replace(/\s+/g, ''), name: name},
      });
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
                    value={idToCall}
                    onChange={(e) => {setIdToCall(e.target.value)}}
                    fullWidth
                  />
                    <Button
                      className={classes.margin}
                      onClick={() => startMeeting()}
                      variant="contained"
                      color="primary"
                      fullWidth
                      endIcon={<ArrowForward fontSize="large" />}
                    >
                       Start Meeting
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
