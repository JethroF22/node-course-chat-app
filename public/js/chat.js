const socket = io();

const form = document.getElementById("message-form");
const messages = document.getElementById("messages");
const locationButton = document.getElementById("send-location");

const displayMessage = data => {
  const formattedTime = moment(data.createdAt).format("h:mm a");
  const template = document.getElementById("message-template").innerHTML;
  const html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    formattedTime
  });
  // const li = document.createElement("li");
  // li.innerHTML = `${data.from} (${formattedTime}): ${data.text} `;
  messages.innerHTML += html;
  scrollToBottom();
};

const scrollToBottom = () => {
  const messages = document.getElementById("messages");
  const newMessage = messages.lastElementChild;

  const clientHeight = messages.clientHeight;
  const scrollTop = messages.scrollTop;
  const scrollHeight = messages.scrollHeight;
  const newMessageHeight = newMessage.clientHeight;
  let lastMessageHeight;
  if (newMessage.previousElementSibling) {
    lastMessageHeight = newMessage.previousElementSibling.clientHeight;
  }

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop = scrollHeight;
  }
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
  displayMessage(data);
});

socket.on("newLocationMessage", data => {
  const formattedTime = moment(data.createdAt).format("h:mm a");
  const template = document.getElementById("location-message-template")
    .innerHTML;
  const html = Mustache.render(template, {
    formattedTime,
    from: data.from,
    url: data.url
  });

  messages.innerHTML += html;
  scrollToBottom();
});
