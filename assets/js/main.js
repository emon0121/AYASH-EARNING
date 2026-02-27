import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  onSnapshot,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tg = window.Telegram.WebApp;
tg.expand();

const tgUser = tg.initDataUnsafe?.user;

if (!tgUser) {
  document.getElementById("user").innerText =
    "Telegram User Not Found";
} else {

  const userRef = doc(db, "users", tgUser.id.toString());

  // ✅ Create user if not exists
  getDoc(userRef).then(async (snap) => {

    if (!snap.exists()) {
      await setDoc(userRef, {
        userId: tgUser.id.toString(),
        name: tgUser.first_name,
        username: tgUser.username || "",
        balance: 0,
        plan: "Free",
        createdAt: new Date()
      });
    }

    // ✅ REALTIME LISTENER
    onSnapshot(userRef, (docSnap) => {

      if (docSnap.exists()) {

        const data = docSnap.data();

        document.getElementById("user").innerHTML =
          `Hello, <b>${data.name}</b>`;

        document.getElementById("balance").innerText =
          `৳${(data.balance || 0).toFixed(2)}`;
      }

    });

  });

}
