import { Button, makeStyles } from '@material-ui/core';
import { AddToQueue, PlayArrow } from '@material-ui/icons';
import React from 'react'
import { Container, H1, Image, ImageContainer, JoinContainer, Text, TextWrapper } from './homeElements'
const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: 20,
    },
  }));
export const HomeScreen = ({pageControl}) => {
      const classes = useStyles();
    return (
           <Container>
               <JoinContainer>
                   <ImageContainer>
                       <Image
                   src={`${process.env.PUBLIC_URL}images/videoconference.svg`}
                  className="logo"
                  alt="join icon"
                  />
                     </ImageContainer>
                  <TextWrapper>
                      <H1>Join</H1>
                      <Text>Join a meeting</Text>
                  </TextWrapper>
                  <Button className={classes.margin} onClick = {() => pageControl('join')} variant="contained" color="primary" fullWidth  startIcon={<AddToQueue fontSize="large" />}>
                  JOIN
                  </Button>
               </JoinContainer>
               <JoinContainer>
                   <ImageContainer>
                       <Image
                   src={`${process.env.PUBLIC_URL}images/video-call.svg`}
                  className="logo"
                  alt="Assurance Logo"
                  />
                     </ImageContainer>
                  <TextWrapper>
                      <H1>Host</H1>
                      <Text>Start a meeting</Text>
                  </TextWrapper>
                  <Button className={classes.margin} onClick = {() => pageControl('host')}  variant="contained" color="primary" fullWidth  startIcon={<PlayArrow fontSize="large" />}>
                  HOST
                  </Button>
               </JoinContainer>
           </Container>

    )
}
