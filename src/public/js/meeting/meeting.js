const APP_ID = "12bf0562227b4f709a09cbbde985a24e";
const CHANNEL_NAME = "video_consulta";

let client = null;
let localVideoTrack = null;
let localStream = null;

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

async function initMeeting() {
  try {
    const response = await fetch(`/api/v1/agora/generate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelName: CHANNEL_NAME }),
    });
    const data = await response.json();
    const token = data.token;

    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const uid = Math.floor(Math.random() * 10000);

    await client.join(APP_ID, CHANNEL_NAME, token, uid);
    console.log("Conectado al canal");

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("Usuario publicado:", user.uid);

      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideo);
      }
    });

    client.on("user-unpublished", (user) => {
      console.log("Usuario no publicado:", user.uid);
      remoteVideo.srcObject = null;
    });

    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;

    localVideoTrack = AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: localStream.getVideoTracks()[0],
    });
    await client.publish([localVideoTrack]);

    console.log("Video local publicado");
  } catch (error) {
    console.error("Error al inicializar la reunión:", error);
  }
}

document.addEventListener("DOMContentLoaded", initMeeting);
