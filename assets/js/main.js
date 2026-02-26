import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Telegram Mini App Init
const tg = window.Telegram.WebApp;
tg.expand();

// Telegram User Data
const user = tg.initDataUnsafe?.user;

if (!user) {
  console.log("Telegram user not found ❌");
} else {

  console.log("Telegram User:", user);

  const userRef = doc(db, "users", user.id.toString());

  async function registerUser() {
    try {

      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {

        await setDoc(userRef, {
          userId: user.id.toString(),
          name: user.first_name || "",
          username: user.username || "",
          balance: 0,
          plan: "Free",
          referrals: 0,
          todayEarning: 0,
          totalEarning: 0,
          isBlocked: false,
          createdAt: new Date()
        });

        console.log("✅ New User Created");

      } else {
        console.log("✅ User Already Exists");
      }

    } catch (error) {
      console.error("Firebase Error:", error);
    }
  }

  registerUser();
}
