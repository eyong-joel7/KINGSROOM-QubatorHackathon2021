import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { RECENT_ACTIVITIES } from '../../CONSTANTS';
import JoinIcon from '../../icons/up-arrow.svg'
import StartIcon from '../../icons/video-camera.svg'
import { Container, H1, Image, ImageContainer, JoinContainer, OutContainer, Text, TextWrapper, Welcome } from './homeElements'
import RecentActivity from './RecentActivity';
const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: 20,
    },
  }));
export const HomeScreen = ({pageControl}) => {
    const [userName, setUserName] = useState('');
    const [recentActivitiesList,setRecentActivitiesList] = useState([]);
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
if(userName) setUserName(capitalize(userName));
 setRecentActivitiesList(JSON.parse(localStorage.getItem(RECENT_ACTIVITIES)));

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
            <ImageContainer  onClick={() => pageControl("join")}>
              <Image src={JoinIcon} className="logo" alt="join icon" />
            </ImageContainer>
            <TextWrapper>
              <H1 style={{ display: isLaptop ? "block" : "none" }}>Join</H1>
              <Text >Join a meeting</Text>
            </TextWrapper>
            <Button
              className={classes.margin}
              onClick={() => pageControl("join")}
              variant="contained"
              color="primary"
              fullWidth
              
              // style={{ display: isLaptop ? "block" : "none" }}
            >
              JOIN
            </Button>
          </JoinContainer>
          <JoinContainer>
            <ImageContainer  onClick={() => pageControl("host")}>
              <Image src={StartIcon} className="logo" alt="Assurance Logo" />
            </ImageContainer>
            <TextWrapper >
              <H1 style={{ display: isLaptop ? "block" : "none" }}>Host</H1>
              <Text >Start a meeting</Text>
            </TextWrapper>
            <Button
              className={classes.margin}
              onClick={() => pageControl("host")}
              variant="contained"
              color="primary"
              fullWidth
              // style={{ display: isLaptop ? "block" : "none" }}
            >
              HOST
            </Button>
          </JoinContainer>
        </Container>
    <RecentActivity recentActivitiesList = {recentActivitiesList}/>
      </OutContainer>
    );
}
