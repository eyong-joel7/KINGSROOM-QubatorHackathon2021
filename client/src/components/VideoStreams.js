import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { SocketContext } from "../Context";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: calc(100vh - 8rem);
    justify-content: center;
    width: 90%;
    margin: auto;
    margin-bottom: 5rem;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    border: 1px #ccc solid;
    margin:10px;
`;

const Video = (props) => {
    const userRef = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            console.log(props.peer)
            userRef.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <>
        <StyledVideo playsInline autoPlay ref={userRef} />
        </>
    );
}

const VideoStreams = () => {
    const {  peers, myVideo} = useContext(SocketContext);
    console.log(peers)
    return (
        <Container>
            <StyledVideo muted ref={myVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
}

export default VideoStreams