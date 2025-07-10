import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCTLmJ63OwMNwe08IKEZ1nzy0MH1M4BUjA",
  authDomain: "vaquitapp-fde10.firebaseapp.com",
  projectId: "vaquitapp-fde10",
  storageBucket: "vaquitapp-fde10.firebasestorage.app",
  messagingSenderId: "237168441569",
  appId: "1:237168441569:web:01ede7432f6dcc47cd1fa0",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const FirebaseDB = getFirestore(app);

export default app;
export { FirebaseDB };
