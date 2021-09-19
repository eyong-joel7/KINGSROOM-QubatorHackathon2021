import React from "react";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';



const Chat = (props) => {
const { toggleControls,users, roomid:room, message, messages, sendMessage, setMessage, name}  = props;
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} toggleControls = {toggleControls}/>
          <Messages messages={messages} name={name} />
          <Input  message={message} setMessage={setMessage} sendMessage={sendMessage} users = {users} name={name}/>
      </div>
    </div>
  );
}
export default Chat;
