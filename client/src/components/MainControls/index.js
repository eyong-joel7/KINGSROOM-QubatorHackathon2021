
import { useContext, React } from "react";
import { SocketContext } from "../../Context";
import "./style.css";

const MainControls = ({ toggleHamburger, setSelected }) => {
  const {
    leaveCall,
    playStop,
    muteUnmute,
    main__mute_button,
    main__video_button,
    stream,
    users,
  } = useContext(SocketContext);
  // const isMobile = useMediaQuery({
  //   query: "(max-device-width: 480px)",
  // });

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
        {/* {!isMobile && (
          <div className="main__controls__button">
            <i className="fas fa-shield-alt"></i>
            <span>Security</span>
          </div>
        )} */}

        <div className="main__controls__button participants" onClick= {()=> { toggleHamburger(); setSelected('users')}}>
          <i className="fas fa-user-friends"><span className  = 'count'>{users?.length}</span></i> 
          <span>Participants</span>
        </div>
        <div className="main__controls__button" onClick = {()=> {toggleHamburger(); setSelected('chat')}}>
          <i className="fas fa-comment-alt"></i>
          <span>Chat</span>
        </div>
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
