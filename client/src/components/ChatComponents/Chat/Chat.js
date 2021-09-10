import React, { useContext } from "react";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
import { SocketContext } from "../../../Context";



const Chat = ({ location, toggleControls}) => {
const {roomid:room, message, messages, sendMessage, setMessage, name }  = useContext(SocketContext)
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} toggleControls = {toggleControls}/>
          <Messages messages={messages} name={name} />
          <Input  message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
export default Chat;
