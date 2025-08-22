// api/login.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

 const firebaseConfig = {
      apiKey: "AIzaSyAk6-ojS17WvRyCn-4mqQgOxRtk6aa1hAc",
      authDomain: "nutritiontracker-56702.firebaseapp.com",
      projectId: "nutritiontracker-56702",
      storageBucket: "nutritiontracker-56702.appspot.com",
      messagingSenderId: "670664900798",
      appId: "1:670664900798:web:f4e0104661ddd985b81eef",
      measurementId: "G-GLNQXTX2SY"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
