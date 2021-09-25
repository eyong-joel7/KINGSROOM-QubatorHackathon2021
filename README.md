# Kingsroom - Video Conferencing application
Kingsroom is a video chat application just like any other video conferencing application intended to deliver a simple and easy but yet secured, resources and user-friendly and advanced functionalities. It is web based which means access to the application can be accessed via a smart phone or desktop browser (over 80 % of web browsers).

# Technologies 
    The application rely solely on WebRTC (Web real-time communication) technology and protocol - a technology which allow web browsers and devices to communicate with each other without the need of any server or third party application. 
    In order to effectively harness the power of webrtc, we made use of several libraries as stated below.
        1. Socket.io and Client. This library is used to created signaling bwtween two peers before they can communicate with one another (Used for the backend and Client side - Front end respectively)
        2. Simple Peer. A simple Javascript library simplifying the WebRTC implementation
        3. React - Javascript library to create our user interface (UI).
        3. Material UI. Icons and styling.
        4. Fontawesome  -  Icons
# Backend
            The backend of this application consist of a simple Node js server build around express and http server library together. The server at this point is hosted on #heroku - demo account 
# Frontend
            React  - javascript library for user-interface. 
            The front end is hosted at #netlify - demo account http://kingsroom.netlify.app/
# Database 
                For storing user info such as payment details, account info and profile info, we have adopt MongoDB - a NO-SQL database. At this (25/09/21) point it is still undo developemt, we are making use of the browsers' #localstorage to persist all data.