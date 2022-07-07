const APP_ID = `b0fe44202e094c95b1e0292b79c054d1`;
const TOKEN = `006b0fe44202e094c95b1e0292b79c054d1IAAGUp4tNqLongCCoIjimUMM/XgwVgdlrwh63t4tLLZTgmTNKL8AAAAAEABC+vTdun7HYgEAAQC5fsdi`;
const CHANNEL = `main`;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Local video[0] and audio[1]
let localTracks = [];
// Other Users
let remoteUsers = {};

// Toggles local user to join a stream with camera and audio track.
let joinAndDisplayLocalStream = async () => {
  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="video-player" id="user-${UID}"></div>
                </div>`;

  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

let joinStream = async () => {
  await joinAndDisplayLocalStream();

  document.getElementById("join-btn").style.display = "none";
  document.getElementById("stream-controls").style.display = "flex";
};

document.getElementById("join-btn").addEventListener("click", joinStream);
