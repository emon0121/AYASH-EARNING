import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user;

if (!user) {
  document.getElementById("user").innerText =
    "Telegram user not detected";
} else {

  const userRef = doc(db, "users", user.id.toString());

  getDoc(userRef).then(async (snap) => {

    // ✅ User create if not exists
    if (!snap.exists()) {

      await setDoc(userRef, {
        userId: user.id.toString(),
        name: user.first_name,
        username: user.username || "",
        balance: 0,
        plan: "Free",
        createdAt: new Date()
      });

      document.getElementById("balance").innerText = "৳0.00";
    }

    // ✅ Load user data
    const data = (await getDoc(userRef)).data();

    document.getElementById("user").innerHTML =
      `Hello, <b>${data.name}</b>`;

    document.getElementById("balance").innerText =
      `৳${data.balance.toFixed(2)}`;
  });
}
