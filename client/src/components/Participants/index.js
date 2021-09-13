import React from 'react'
import './participants.css';
import InfoBar from '../ChatComponents/InfoBar/InfoBar';
import SimpleList from './ReactList';

const Participants = ({toggleControls, users}) => {
    return (
        <div className="outerContainer">
        <div className="container">
        <InfoBar  toggleControls = {toggleControls}/>
        {
      users
        ? (
          <>
           <SimpleList users = {users}/>
          </>
        )
        : null
    }
        </div>
       
      </div>
    )
}

export default Participants
