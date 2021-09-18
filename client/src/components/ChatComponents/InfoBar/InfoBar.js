import React from 'react';

import CloseIcon  from '@material-ui/icons/Close'

import './InfoBar.css';
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
const InfoBar = ({ room, toggleControls}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3 className = 'meetingID'>{capitalize(room)}</h3>
    </div>
    <div className="rightInnerContainer">
     <span onClick = {toggleControls} className = 'closeicon'><CloseIcon /></span>
    </div>
  </div>
);

export default InfoBar;