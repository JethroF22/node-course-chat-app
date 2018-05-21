const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(publicPath)));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"));

  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "A new user has joined")
  );

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  socket.on("createMessage", data => {
    console.log("From:", data.from);
    console.log("Text:", data.text);
    io.emit("newMessage", generateMessage(data.from, data.text));
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
