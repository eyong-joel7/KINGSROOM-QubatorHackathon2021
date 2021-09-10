import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { SocketContext } from "../Context";

const Container = styled.div`
  padding: 20px;
  display: flex;
  max-height: calc(100vh - 8rem);
  width: 90%;
  margin: auto;
  margin-bottom: 5rem;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  margin: 10px;
  width: 40%;
  height: 30%; 
`;

const Video = (props) => {
  const userRef = useRef();
const {peer} = props;
  useEffect(() => {
    peer.on("stream", (stream) => {
    if(userRef.current) userRef.current.srcObject = stream;
    });
  }, [peer, userRef]);

  return (
    <>
      <StyledVideo playsInline autoPlay ref={userRef} />
    </>
  );
};

const VideoStreams = () => {
  const { peers, myVideo, stream} = useContext(SocketContext);
  useEffect(() => {
if(myVideo.current) myVideo.current.srcObject = stream
  },[myVideo, stream])
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
