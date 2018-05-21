const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(publicPath)));

io.on("connection", socket => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  socket.on("createMessage", data => {
    console.log("Message: ", data.text);
    console.log("From: ", data.from);
  });

  socket.emit("newMessage", {
    from: "user name goes here",
    text: "For your eyes only",
    createdAt: new Date()
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
