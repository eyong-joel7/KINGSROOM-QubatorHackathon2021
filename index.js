const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const messageRouter = require("./routers/messageRouter");
dotenv.config();
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;


// old logic
// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id);

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});

// 	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});
// });

const users = {};
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, userName:name }, callBack) => {
    const { error, user } = addUser({ id: socket.id, name, roomID });
    if (error) return callBack(error);
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }

    //messaging inplementaion
    
    socket.join(user.room);
    const userName = capitalize(name);
    io.to(socket.id).emit("message", {
      user: "admin",
      text: `Welcome, esteemed ${userName}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${userName} just joined!`,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sendMessage", ({message, userID}, callback) => {
    const user = getUser(socket.id);
  user &&  io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    const user = removeUser(socket.id);
    if (user) {
      const userName =capitalize( user.name);
      io.to(roomID).emit("message", {
        user: "Admin",
        text: `${userName} has left.`,
      });
      io.to(roomID).emit("roomData", {
        room: roomID,
        users: getUsersInRoom(roomID),
      });
    }

    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit('user left', socket.id)
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
