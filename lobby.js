// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// ✅ Firebase Config from your project settings
const firebaseConfig = {
  apiKey: "AIzaSyAU0Iosij4EjVIWJoWrzdglN4VG8m-BrDs",
  authDomain: "snakes-ladders-multiplay-8cef2.firebaseapp.com",
  databaseURL: "https://snakes-ladders-multiplay-8cef2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snakes-ladders-multiplay-8cef2",
  storageBucket: "snakes-ladders-multiplay-8cef2.appspot.com",
  messagingSenderId: "884472605666",
  appId: "1:884472605666:web:6e3d428f7bc6a0cc78a7bb"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("✅ Firebase initialized");

// ✅ Join button logic
document.getElementById("joinBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const room = document.getElementById("room").value.trim();
  const avatar = document.getElementById("avatar").value;

  if (!name || !room) {
    alert("Please enter your name and room");
    return;
  }

  const playerData = {
    name,
    avatar,
    position: 0,
    score: 0
  };

  const playerRef = ref(db, `rooms/${room}/players/${name}`);

  set(playerRef, playerData)
    .then(() => {
      console.log("Player joined and written to Firebase");
      // ✅ Redirect to game page with player info
      window.location.href = `game.html?room=${room}&name=${name}`;
    })
    .catch((error) => {
      console.error("❌ Failed to write player data:", error);
      alert("Could not join room. Try again.");
    });
});
