const APP_ID = process.env.APP_ID;
const TOKEN = process.env.TOKEN;
const CHANNEL = process.env.CHANNEL;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `<div class='video-container' id='user-container-${UID}'>
                    <div class='video-player' id='user-${UID}'></div>
                </div>`;

  document
    .getElementById("video-streams")
    .insertAdjacentElement("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);

  
};

