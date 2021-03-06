const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);

const dotenv = require("dotenv");

dotenv.config();
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

const users = {};
function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, userName: name }, callBack) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      roomID,
      isAdmin: false,
    });

    if (error) return callBack(error);
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        removeUser(socket.id);
        return callBack(
          "Sorry, this room is full. Please Contact the organizer"
        );
      }
      const newUser = {
        id: socket.id,
        userName: name,
      };
      users[roomID].push(newUser);
      socket.username = name;
    } else {
      return callBack(
        "The meeting might have not started or meeting ID is incorrect"
      );
    }

    //messaging implementaion

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
    const usersInThisRoom = users[roomID].filter(
      (user) => user.id !== socket.id
    );
    socket.emit("all users", usersInThisRoom);
    console.log("usersInThisRoom", usersInThisRoom);
  });

  socket.on("start a meeting", ({ roomID, userName: name }, callBack) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      roomID,
      isAdmin: true,
    });
    if (error) return callBack(error);
    const newUser = {
      id: socket.id,
      userName: name,
    };
    if (roomID in users) {
      users[roomID].push(newUser);
    } else {
      users[roomID] = [newUser];
    }
    socket.username = name;
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
    const usersInThisRoom = users[roomID].filter(
      (user) => user.id !== socket.id
    );
    socket.emit("all users", usersInThisRoom);
    console.log("usersInThisRoom", usersInThisRoom);
  });

  socket.on("sendMessage", ({ message, userID, recipient }, callback) => {
    const user = getUser(socket.id);
    user && recipient
      ? io.to(recipient).to(socket.id).emit("message", { user: user.name, text: message })
      : io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      userName: socket.username,
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
      const userName = capitalize(user.name);
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
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.to(roomID).emit("user left", socket.id);
  });

  socket.on("change", (payload) => {
    socket.broadcast.emit("change", payload);
  });
  socket.on("admin playstop muteunmute", (payload) => {
    io.to(payload.peerID).emit("admin playstop muteunmute", payload);
  });
});
app.get("/", (req, res) => {
  res.send("Server is ready");
});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
