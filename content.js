var ws;
const ports = new Set();

console.log("video found on: %s", window.location.hostname);

const initializeWebSocketConnection = () => {
  ws = new WebSocket("ws://localhost:8080");

  ws.onopen = function () {
    ws.send(JSON.stringify({
      message: "Connection established from Chrome Extension"
    }));
  };

  ws.onmessage = function(message) {
    let data = JSON.parse(message.data);
    console.log(data);
    if (data.message == "playpause") {
      playPause();
    }
  };
};


const playPause = () => {
  var video = document.getElementsByTagName("video") [0];
  
  if (window.location.hostname === "www.youtube.com") {
    console.log("play/pause youtube video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
};

initializeWebSocketConnection();