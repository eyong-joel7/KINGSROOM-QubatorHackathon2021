import { makeStyles } from '@material-ui/core';
import Chat from '../ChatComponents/Chat/Chat'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import MainControls from '../MainControls';
import Notifications from '../Notifications';
import VideoStreams from '../VideoStreams';
import './conferenceElements.css'
import Participants from '../Participants';


const ConferenceRoom = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [selected, setSelected] = useState('');
    const hiddenClass = useMediaQuery({
      query: '(min-device-width: 1200px)',
    });
    const toggleHamburger = () => {
      setIsToggled(!isToggled);
    };
  
  const closeNav = ()=>{
    if((!hiddenClass && isToggled)){
    toggleHamburger();
    }
  }
  const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: "30px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
  
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    image: {
      marginLeft: "15px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: '100%',
   
    },
  }));
  const classes = useStyles();
    return (
      <div>
        <div className="conference video_app__container">
          <nav
            className={
              !isToggled
                ? "conference video_app__nav primary-and-secondary hidden"
                : "conference video_app__nav primary-and-secondary"
            }
          >
            <div className="nav__contents">
              {selected === "chat" ? (
                <Chat toggleControls={toggleHamburger} />
              ) : selected === "users" ? (
                <Participants toggleControls={toggleHamburger} />
              ) : null}
            </div>
          </nav>
          <main className=" conference video_app__main">
            <div className="conference title-area">
              <div className="conference video_app__header">
                <div>
                  <div>
                    <div className="_header-content--header--3mdiS shared--outer-container--3eppq">
                      <div className="_header-content--part-info--3iVwL">
                        <h1>Welcome</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Put video thumbnail here */}
            <div
              className="content-area"
              style={{ backgroundColor: "rgb(250, 251, 252)" }}
            >
              <div aria-hidden="true" className="hidden-header">
                <div className="video_app__header">
                  <div>
                    <div>
                      <div className="_header-content--header--3mdiS shared--outer-container--3eppq">
                        <div className="_header-content--part-info--3iVwL">
                          <h1>Welcome</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="content"
                className="video_app__body"
                onClick={() => closeNav()}
              >
                <div className="index--container--uI0r1">
                  <div className="index--body--3G2lS">
                    <div className={classes.wrapper}>
                      <VideoStreams />
                      <Notifications show={true} />
                    </div>
                  </div>
                  <span className="footer-link--footer-link--3EuAW">
                    <div className="footer-link--contents--1AXQE shared--outer-container--3eppq">
                      <MainControls toggleHamburger={toggleHamburger} setSelected = {setSelected}/>
                    </div>
                  </span>
                </div>
              </div>
            </div>{" "}
          </main>{" "}
        </div>
      </div>
    );
}

export default ConferenceRoom
