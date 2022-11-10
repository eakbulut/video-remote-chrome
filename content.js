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
    if (data.message == "rewind_back") {
      rewind(-10);
    }
    if (data.message == "rewind_forward") {
      rewind(10);
    }

  };
};

const isSupported = (hostname) => {
  console.log(hostname);
  return (hostname === "www.youtube.com" || hostname === "learning.anaconda.cloud")
}

const playPause = () => {
  if (!isSupported(window.location.hostname)) return;
  
  var video = document.getElementsByTagName("video") [0];
  
  console.log("play/pause youtube video");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const rewind = (seconds) => {
  if (!isSupported(window.location.hostname)) return;

  var video = document.getElementsByTagName("video") [0];
  
  console.log("rewind " + seconds + " seconds");
  video.currentTime = video.currentTime + seconds;
};

initializeWebSocketConnection();