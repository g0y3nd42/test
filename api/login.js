// api/login.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// 🔑 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAk6-ojS17WvRyCn-4mqQgOxRtk6aa1hAc",
  authDomain: "nutritiontracker-56702.firebaseapp.com",
  projectId: "nutritiontracker-56702",
  storageBucket: "nutritiontracker-56702.appspot.com",
  messagingSenderId: "670664900798",
  appId: "1:670664900798:web:f4e0104661ddd985b81eef",
  measurementId: "G-GLNQXTX2SY"
};

// ✅ Ensure Firebase App is initialized once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const auth = getAuth(app);
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    // 🔐 Get Firebase ID Token
    const token = await userCred.user.getIdToken();

    return res.status(200).json({ token });
  } catch (error) {
    console.error("🔥 Firebase Auth error:", error);
    return res.status(500).json({ error: error.message });
  }
}
