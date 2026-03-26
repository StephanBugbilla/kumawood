import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGVSs48lO7famjzN4fetbzmj1w88xJEQg",
  authDomain: "sankofa-9d039.firebaseapp.com",
  projectId: "sankofa-9d039",
  storageBucket: "sankofa-9d039.firebasestorage.app",
  messagingSenderId: "131403160147",
  appId: "1:131403160147:web:660bcf9b109758c61544a6",
  measurementId: "G-X38QM3QQYR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
