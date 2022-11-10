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
    if (data.message == "rewind") {
      seek(-10);
    }
    if (data.message == "forward") {
      seek(10);
    }
    if (data.message == "restart") {
      restart();
    }
    if (data.message == "next") {
      next();
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
  
  console.log("play/pause video");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const seek = (seconds) => {
  if (!isSupported(window.location.hostname)) return;

  var video = document.getElementsByTagName("video") [0];
  
  console.log("added " + seconds + " seconds");
  video.currentTime = video.currentTime + seconds;
};

const restart = () => {
  if (!isSupported(window.location.hostname)) return;

  var video = document.getElementsByTagName("video") [0]
  console.log("restart video");
  if (video.paused) {
    video.currentTime = 0;
    video.play();
  } else {
    video.pause();
    video.currentTime = 0;
    video.play();
  }
};

const next = () => {
  if (!isSupported(window.location.hostname)) return;

  var video = document.getElementsByTagName("video") [0]

  if (window.location.hostname == "learning.anaconda.cloud") {
    console.log("next video");
    document.querySelector("a.next-lesson-link").dispatchEvent(new Event('mouseup'));
    setTimeout(window.onload = () => {
      video.play();
    }, 100);
  }
};

initializeWebSocketConnection();