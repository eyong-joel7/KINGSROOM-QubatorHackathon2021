
import { React } from "react";
import "./style.css";
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/Group';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';



const MainControls = (props) => {
  const {
    leaveCall,
    playStop,
    muteUnmute,
    main__mute_button,
    main__video_button,
    stream,
    users,
    toggleHamburger, 
    setSelected
  } = props;
 

  return (
    <div className="main__controls">
       
      {stream && (
        <div className="main__controls__block">
          <div
            ref={main__mute_button}
            onClick={muteUnmute}
            className="main__controls__button main__mute_button"
          >
            <i className="fas fa-microphone"></i>
            <span>Mute</span>
          </div>
          <div
            ref={main__video_button}
            onClick={playStop}
            className="main__controls__button main__video_button"
          >
            <i className="fas fa-video"></i>
            <span>Stop Video</span>
          </div>
        </div>
      )}

      <div className="main__controls__block">

        <div className="main__controls__button participants" onClick= {()=> { toggleHamburger(); setSelected('users')}}>
        <Badge badgeContent={users?.length} color="primary">
        <GroupIcon/>
      </Badge>
          <span>Participants</span>
        </div>
        <div className="main__controls__button" onClick = {()=> {toggleHamburger(); setSelected('chat')}}>
          <i className="fas fa-comment-alt"></i>
          <span>Chat</span>
        </div>
        {/* <div className="main__controls__button" onClick = {()=> {toggleHamburger(); setSelected('chat')}}>
         <span><PersonAddIcon/></span>
          <span>Invite</span>
        </div> */}
      </div>
        <div className="main__controls__block">
          <div className="main__controls__button leave">
            <span className="leave_meeting" onClick={leaveCall}>
              Leave
            </span>
          </div>
        </div>

    </div>
  );
};
export default MainControls;
