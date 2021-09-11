import { useContext, useEffect,  useRef } from "react";
import styled from "styled-components";
import { SocketContext } from "../Context";

const Container = styled.div`
  padding: 20px;
  display: flex;
  max-height: calc(100vh - 8rem);
  width: 90%;
  align-items: center;
  margin: auto;
  margin-bottom: 5rem;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  margin: 10px;
  width: 40%;
  height: 30%;
  border: 2px #1f1f1f solid;
  border-radius: 10px;
`;

const Video = (props) => {
  const userRef = useRef();
  const { peer } = props;
// //      if ("srcObject" in userRef.current) {
//     userRef.current.srcObject = stream;
// } else {
//   userRef.current.src = window.URL.createObjectURL(stream);
// }

useEffect(()=> {
    peer.on('stream', (stream) => {
          userRef.current.srcObject = stream;
    });
} 
, [peer])

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
