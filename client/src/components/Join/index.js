import { Button, makeStyles } from "@material-ui/core";
import {ArrowBackIos } from "@material-ui/icons";
import React from "react";
import Card from "../Card";
import { useMediaQuery } from 'react-responsive';

import {
  Container,
  Image,
  ImageContainer,
  JoinContainer,
  Text,
  TextWrapper,
} from "./joinElements";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 5,
    alignSelf: 'flex-start',

  },
}));
const JoinAMeeting = ({ pageControl }) => {

  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)',
  });
  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.margin}
        style = {{marginLeft: '3px'}}
        onClick={() => pageControl("home")}
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIos fontSize="large" />}
      >
        Back
      </Button>

      <Container>
        <JoinContainer style = {{order: isMobile? '1': '0'}}>
          <ImageContainer isMobile = {isMobile}>
            <Image
              src={`${process.env.PUBLIC_URL}images/videoconference.svg`}
              className="icon"
              alt="join-meeting-icon"
            />
          </ImageContainer>
          <TextWrapper>
            <Text>Please enter your name and the meeting ID</Text>
          </TextWrapper>
       
        </JoinContainer>
        <JoinContainer>
          <Card join />
        </JoinContainer>
      </Container>
    </>
  );
};

export default JoinAMeeting;
