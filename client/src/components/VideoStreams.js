import { useContext, useEffect,  useRef } from "react";
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
  const { peer } = props;
  console.log('peer',peer)
    peer.on('stream', (stream) => {
        console.log('i am in here1')
        if ("srcObject" in userRef.current) {
          userRef.current.srcObject = stream;
          console.log('i am in here1')
        } else {
          userRef.current.src = window.URL.createObjectURL(stream);
          console.log('i am in here2')
        }
    });
  return (
    <>
      <StyledVideo playsInline autoPlay ref={userRef} />
    </>
  );
};
const VideoStreams = () => {
  const { peers, myVideo, stream } = useContext(SocketContext);
  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideo, peers, stream]);
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
