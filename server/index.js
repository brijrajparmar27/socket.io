const express = require('express');
const socketio = require('socket.io');
const cors = require("cors");

const app = express();
app.use(cors());

const server = app.listen(5000);

const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {

  console.log("connected to ", socket.id);

  io.on("disconnect", () => {
    console.log("disconnected to ", socket.id)
  })

  socket.on("chat-send", (paload) => {
    console.log(socket.id, " says ", paload)
    io.emit("chat-recieve", paload)
  })

  socket.on("change-room", payload=>{
    socket.join(payload);
    console.log("room switched to ",payload)
  })

})