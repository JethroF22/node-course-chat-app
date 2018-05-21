const socket = io();

const form = document.getElementById("message-form");
const messages = document.getElementById("messages");
const locationButton = document.getElementById("send-location");

const displayMessage = data => {
  const li = document.createElement("li");
  const formattedTime = moment(data.createdAt).format("h:mm a");
  li.innerHTML = `${data.from} (${formattedTime}): ${data.text} `;
  messages.appendChild(li);
};

form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: e.target.message.value
  });
});

locationButton.addEventListener("click", e => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      socket.emit("createLocationMessage", {
        latitude,
        longitude
      });
    },
    () => {
      alert("Unable to fetch location");
    }
  );
});

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("newMessage", data => {
  console.log("Message: ", data.text);
  console.log("From: ", data.from);
  console.log("Time:", data.createdAt);
  displayMessage(data);
});

socket.on("newLocationMessage", data => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const formattedTime = moment(data.createdAt).format("h:mm a");
  a.innerHTML = "My current location";
  a.setAttribute("target", "_blank");
  a.setAttribute("href", data.url);
  li.innerHTML = `${data.from} (${formattedTime}): `;
  li.appendChild(a);

  messages.appendChild(li);

  li;
});
