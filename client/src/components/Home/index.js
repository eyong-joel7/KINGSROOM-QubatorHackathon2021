import { Button, makeStyles } from '@material-ui/core';
import { AddToQueue, PlayArrow } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import JoinIcon from '../../icons/up-arrow.svg'
import StartIcon from '../../icons/video-camera.svg'
import { Container, H1, Image, ImageContainer, JoinContainer, OutContainer, Text, TextWrapper, Welcome } from './homeElements'
const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: 20,
    },
  }));
export const HomeScreen = ({pageControl}) => {
    const [userName, setUserName] = useState('')
    const isLaptop = useMediaQuery({
        query: '(min-device-width: 900px)',
      });
      const classes = useStyles();
      function capitalize(s)
      {
          return s && s[0].toUpperCase() + s.slice(1);
      }
      useEffect(() => {
const userName = localStorage.getItem('firstName');
if(userName) setUserName(capitalize(userName))
      }, [])
    return (
      <OutContainer>
        <Welcome>
            <H1 style = {{color:'#6e6868'}}>
           {
               userName ? `Welcome Back, ${userName}` : 'Welcome'
           } 
            </H1>
        </Welcome>
        <Container>
          <JoinContainer>
            <ImageContainer>
              <Image src={JoinIcon} className="logo" alt="join icon" />
            </ImageContainer>
            <TextWrapper style={{ display: isLaptop ? "block" : "none" }}>
              <H1>Join</H1>
              <Text>Join a meeting</Text>
            </TextWrapper>
            <Button
              className={classes.margin}
              onClick={() => pageControl("join")}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddToQueue fontSize="large" />}
            >
              JOIN
            </Button>
          </JoinContainer>
          <JoinContainer>
            <ImageContainer>
              <Image src={StartIcon} className="logo" alt="Assurance Logo" />
            </ImageContainer>
            <TextWrapper style={{ display: isLaptop ? "block" : "none" }}>
              <H1>Host</H1>
              <Text>Start a meeting</Text>
            </TextWrapper>
            <Button
              className={classes.margin}
              onClick={() => pageControl("host")}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<PlayArrow fontSize="large" />}
            >
              HOST
            </Button>
          </JoinContainer>
        </Container>
      </OutContainer>
    );
}
