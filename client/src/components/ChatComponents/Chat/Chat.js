import React from "react";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';



const Chat = (props) => {
const { toggleControls, roomid:room, message, messages, sendMessage, setMessage, name}  = props;
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
