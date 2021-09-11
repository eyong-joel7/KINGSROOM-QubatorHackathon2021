import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '400px',
    height:'400px',
    [theme.breakpoints.down('xs')]: {
      width: '200px',
      height: '200px'
    },
  },
  gridContainer: {
    justifyContent: 'center',
    alignContent:'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      overflow:'scroll'
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, myVideo, userVideo, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  console.log(`I am in video:${stream}`)

  return (
    <Grid container className={classes.gridContainer}>
      {'srcObject' in myVideo && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || ''}</Typography>
            <video id = 'myVideo' playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
       {
         'srcObject' in userVideo
         && <Paper className={classes.paper}>
         <Grid item xs={12} md={6}>
           <Typography variant="h5" gutterBottom>{call.name || ''}</Typography>
           <video playsInline ref={userVideo} autoPlay className={classes.video} />
         </Grid>
       </Paper>
       }
        
      
    </Grid>
  );
};

export default VideoPlayer;
