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
} from "./hostElements";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 5,
    alignSelf: 'flex-start',

  },
}));
const StartAMeeting = ({ pageControl }) => {
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
              src={`${process.env.PUBLIC_URL}images/video-call.svg`}
              className="icon"
              alt="start-meeting-icon"
            />
          </ImageContainer>
          <TextWrapper>
            <Text>Enter your name and create a meeting ID</Text>
          </TextWrapper>
        </JoinContainer>
        <JoinContainer>
          <Card host />
        </JoinContainer>
      </Container>
    </>
  );
};

export default StartAMeeting;
