import React from 'react';

import onlineIcon from '../../../icons/onlineIcon.png';

import CloseIcon  from '@material-ui/icons/Close'

import './InfoBar.css';
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
const InfoBar = ({ room, toggleControls}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{capitalize(room)}</h3>
    </div>
    <div className="rightInnerContainer">
     <span onClick = {toggleControls} style = {{color :'#fff'}}><CloseIcon /></span>
    </div>
  </div>
);

export default InfoBar;