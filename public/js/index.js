const socket = io();
socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "user name goes here",
    text: "For your eyes only"
  });
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("newMessage", data => {
  console.log("Message: ", data.text);
  console.log("From: ", data.from);
  console.log("Time:", data.createdAt);
});