import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tg = window.Telegram.WebApp;
tg.expand();

// ✅ Telegram Ready হওয়া পর্যন্ত wait
Telegram.WebApp.ready();

setTimeout(async () => {

  const user = tg.initDataUnsafe?.user;

  if (!user) {
    console.log("Telegram user not found");
    return;
  }

  // UI Name Show
  document.getElementById("user").innerHTML =
    "Hello, <b>" + user.first_name + "</b>";

  const userRef = doc(db, "users", user.id.toString());

  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {

    await setDoc(userRef, {
      userId: user.id.toString(),
      name: user.first_name,
      username: user.username || "",
      balance: 0,
      plan: "Free",
      createdAt: new Date()
    });

    console.log("User Registered");

  } else {
    console.log("User Already Exists");
  }

}, 1000);
