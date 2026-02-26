import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

function startApp() {

  const user = tg.initDataUnsafe?.user;

  if (!user) {
    document.getElementById("user").innerText =
      "Please open from Telegram Bot";
    return;
  }

  document.getElementById("user").innerHTML =
    "Hello, <b>" + user.first_name + "</b>";

  const userRef = doc(db, "users", user.id.toString());

  getDoc(userRef).then(async (docSnap) => {

    if (!docSnap.exists()) {

      await setDoc(userRef, {
        userId: user.id.toString(),
        name: user.first_name,
        username: user.username || "",
        balance: 10,
        plan: "Free",
        createdAt: new Date()
      });

      document.getElementById("balance").innerText = "৳10.00";

      console.log("✅ New User Created");

    } else {

      const data = docSnap.data();

      document.getElementById("balance").innerText =
        "৳" + data.balance + ".00";

      console.log("✅ User Loaded");
    }

  });

}

setTimeout(startApp, 1000);
