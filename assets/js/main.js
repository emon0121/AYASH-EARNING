import { db } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;

if (user) {
  const userRef = doc(db, "users", user.id.toString());

  getDoc(userRef).then((docSnap) => {
    if (!docSnap.exists()) {
      setDoc(userRef, {
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
  });
}
