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
            {/* <h1 style ={{color: '#fff'}}>Active Participants:</h1> */}
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
