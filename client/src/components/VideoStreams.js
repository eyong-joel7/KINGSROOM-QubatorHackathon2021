/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  useRef } from "react";
import styled from "styled-components";


const Container = styled.div`
  padding: 20px;
  display: flex;
  max-height: 100%;
  width: 90%;
  align-items: center;
  margin: auto;
  margin-bottom: 5rem;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  margin: 10px;
  width: 48%;
  height: 40%;
  border: 2px #1f1f1f solid;
  border-radius: 10px;
`;

const Video = (props) => {
  const userRef = useRef();
// //      if ("srcObject" in userRef.current) {
//     userRef.current.srcObject = stream;
// } else {
//   userRef.current.src = window.URL.createObjectURL(stream);
// }

useEffect(()=> {
    props.peer.on('stream', (stream) => {
          userRef.current.srcObject = stream;
          console.log('i am in this component')
    });
} 
, [])

  return (
    <>
      <StyledVideo playsInline autoPlay ref={userRef} />
    </>
  );
};

const VideoStreams = (props) => {
  const { peers, myVideo} = props;
  return (
    <Container>
      <StyledVideo muted ref={myVideo} autoPlay playsInline />
      {peers.map((peer) => {
        return <Video key={peer.peerID} peer={peer.peer} />;
      })}
    </Container>
  );
};

export default VideoStreams;
