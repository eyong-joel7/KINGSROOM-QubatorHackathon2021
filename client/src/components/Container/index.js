/* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable jsx-a11y/anchor-is-valid */
import {makeStyles } from '@material-ui/core';

import React, {useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import './ContainerElements.css';
import { HomeScreen } from '../Home';
import JoinAMeeting from '../Join';
import StartAMeeting from '../Host';
import ProfileScreen from '../ProfileScreen';
import { Person } from '@material-ui/icons';
import SettingScreen from '../Settings';

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

const Container = () => {
  const classes = useStyles();
  const [isToggled, setIsToggled] = useState(false);
  const [page, setPage] = useState('home');
  const hiddenClass = useMediaQuery({
    query: '(min-device-width: 900px)',
  });
  const toggleHamburger = () => {
    setIsToggled(!isToggled);
  };

const closeNav = ()=>{
  if((!hiddenClass && isToggled)){
  toggleHamburger();
  }
}

const pageControl = (input) => {
  setPage(input);
}
  return (
    <div>
      <div className="video_app__container">
        <nav
          className={
            !hiddenClass && !isToggled
              ? "video_app__nav primary-and-secondary hidden"
              : "video_app__nav primary-and-secondary"
          }
        >
          <div className="nav__contents">
            <div className="primary-nav">
              <div className="video_app__nav nav-small">
                <div className="nav-groups">
                  <div className="_nav--nav-group-with-sidebar--2eeny">
                    <ul className="nav-group">
                      <li className="nav-item">
                        <a href ='#' title="Home" onClick = {() => {setPage('home'); toggleHamburger()}}>
                          <span className="nav-item-icon-container">
                            <span className="nav-item-icon">
                              <i
                                className="vds-icon vds-icon--lg"
                                role="img"
                                aria-label="Home"
                                aria-hidden="false"
                              >
                                <svg viewBox="0 0 32 32">
                                  <path d="M16.027 5l.024.001a1.003 1.003 0 01.59.233l6.357 5.334V10a1 1 0 112 0v2.246L26.6 13.59a1 1 0 01-1.286 1.532l-9.316-7.816-7 5.873V24h3v-5a1 1 0 011-1h6a1 1 0 011 1v5h3v-6a1 1 0 112 0v7a1 1 0 01-.883.993L24 26h-5a1 1 0 01-1-1l-.001-5h-4v5a1 1 0 01-.883.993L13 26h-5a1 1 0 01-1-1l-.001-10.143-.315.265a1 1 0 11-1.286-1.532l9.959-8.356.038-.03a.993.993 0 01.039-.029l-.077.059A1.008 1.008 0 0115.998 5h.029z" />
                                </svg>
                              </i>
                            </span>
                          </span>
                          <span className="nav-item-title">Home</span>
                        </a>
                      </li>
                      <li className="nav-item _nav--help--1_fHw _nav--inactive--2UbLW">
                        <a href="#" title="Profile" onClick={() => {setPage('profile'); toggleHamburger()}}>
                          <span className="nav-item-icon-container">
                            <span className="nav-item-icon">
                              <div className="_nav--unread-badge-container--11uuK">
                                {/* <Avatar alt="dummy" src={Icon} /> */}
                                <Person/>
                              </div>
                            </span>
                          </span>
                          <span style = {{marginTop: '3px'}} className="nav-item-title">Profile</span>
                        </a>
                      </li>
                  
                    </ul>
                  </div>
                  <div className="_nav--nav-group-with-sidebar--2eeny">
                    <ul className="nav-group">
                      <li className="nav-item">
                        <a  href="#" onClick={() => { setPage('setting'); toggleHamburger()}} title="Settings" >
                          <span className="nav-item-icon-container">
                            <span className="nav-item-icon">
                              <i
                                className="vds-icon vds-icon--lg"
                                role="img"
                                aria-label="Settings"
                                aria-hidden="false"
                              >
                                <svg viewBox="0 0 33 32">
                                  <path d="M4.031 14.022c0-1.104.89-1.99 2.003-1.99l.83-.001a9.992 9.992 0 011.187-2.027l-.384-.667a2.002 2.002 0 01.722-2.73l3.48-2.009a1.99 1.99 0 012.726.74l.429.743a10.119 10.119 0 011.724-.025l.416-.719a2.002 2.002 0 012.725-.739l3.48 2.01a1.99 1.99 0 01.723 2.73l-.255.442a9.998 9.998 0 011.362 2.25l.83.001c1.101 0 2.002.895 2.002 1.99v4.02a1.99 1.99 0 01-2.003 1.99h-.83a9.997 9.997 0 01-1.34 2.226l.234.406a2.002 2.002 0 01-.723 2.73l-3.48 2.009a1.99 1.99 0 01-2.725-.74l-.38-.659a10.142 10.142 0 01-1.794-.025l-.395.685a2.002 2.002 0 01-2.726.739l-3.48-2.01a1.99 1.99 0 01-.722-2.73l.363-.631a9.991 9.991 0 01-1.167-2h-.829a2.002 2.002 0 01-2.003-1.99v-4.02zm2 4.018c0-.003.363-.006 1.088-.007l.517-.001H8.283a7.993 7.993 0 002.196 3.76l-1.08 1.87 3.47 2.008c-.004-.003.36-.64 1.092-1.91a8.025 8.025 0 003.875.067l1.06 1.836 3.473-2.003c-.004.003-.332-.559-.983-1.685a7.999 7.999 0 002.393-3.944h2.25v-.445-.105l.001-1.232v-.203l.001-2.024c0 .003-.266.005-.8.007H24.783l-.356.001h-.194l-.356.001h-.097a7.998 7.998 0 00-2.418-3.966l.999-1.728-3.47-2.007c.004.003-.358.636-1.086 1.899a8.013 8.013 0 00-3.812.065l-1.13-1.957L9.39 8.34c.005-.003.376.634 1.114 1.91a7.982 7.982 0 00-2.22 3.78l-2.249.001v.446l-.001.104v1.435L6.03 17.75v.291zm6-2.009a4 4 0 118 0 4 4 0 01-8 0zm2 0a2 2 0 104 0 2 2 0 00-4 0z" />
                                </svg>
                              </i>
                            </span>
                          </span>
                          <span className="nav-item-title">Settings</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/" title="Logout">
                          <span className="nav-item-icon-container">
                            <span className="nav-item-icon">
                              <i
                                className="vds-icon vds-icon--lg"
                                role="img"
                                aria-label="Logout"
                                aria-hidden="false"
                              >
                                <svg viewBox="0 0 32 32">
                                  <path d="M25 6a1 1 0 011 1v18a1 1 0 01-1 1h-6a1 1 0 01-1-1v-3a1 1 0 012 0v2h4V8h-4v2a1 1 0 01-2 0V7a1 1 0 011-1zm-13.707 4.293a1 1 0 011.414 1.414L9.414 15H21a1 1 0 01.993.883L22 16a1 1 0 01-1 1H9.414l3.293 3.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                                </svg>
                              </i>
                            </span>
                          </span>
                          <span className="nav-item-title">Logout</span>
                        </a>
                      </li>
                 
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="video_app__main">
          <div className="title-area">
            <div className="video_app__header">
              <div>
                <div>
                  <div className="_header-content--header--3mdiS shared--outer-container--3eppq">
                    <div
                      className="hamburger--hamburger--1oS_7"
                      style={{ display: hiddenClass ? "none" : "block" }}
                    >
                      <button
                        className="vds-round-button vds-round-button--minimal-inverse vds-round-button--icon"
                        type="button"
                        onClick={() => toggleHamburger()}
                      >
                        <span className="vds-round-button__content">
                          <i
                            className="vds-icon vds-color--cerulean"
                            role="img"
                            aria-label="Toggle Sidebar"
                            aria-hidden="false"
                          >
                            <svg viewBox="0 0 33 32">
                              <path d="M24 21a1 1 0 010 2H8a1 1 0 010-2h16zm0-6a1 1 0 010 2H8a1 1 0 010-2h16zm0-6a1 1 0 010 2H8a1 1 0 010-2h16z" />
                            </svg>
                          </i>
                          <span className="vds-visually-hidden" />
                        </span>
                      </button>
                    </div>

                    <div className="_header-content--part-info--3iVwL">
                      <h1>Kingsroom</h1>
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
                        <h1>Kingsroom</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="content"
              className="cont video_app__body"
              onClick={() => closeNav()}
            >
              <div className="index--container--uI0r1">
                <div className="index--body--3G2lS">
                  <div className={classes.wrapper}>
                  {page === 'home' && <HomeScreen pageControl = {pageControl}/>}  
                  {page === 'join' && <JoinAMeeting pageControl = {pageControl} />}
                  {page === 'host' && <StartAMeeting pageControl = {pageControl} />}
                  {page === 'profile' && <ProfileScreen pageControl = {pageControl}/>}
                  {page === 'setting' && <SettingScreen pageControl = {pageControl}/>}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </main>{" "}
      </div>
    </div>
 
 );
};

export default Container;
