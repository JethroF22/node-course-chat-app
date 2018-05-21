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
    io.emit("newMessage", {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
