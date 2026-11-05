
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCg3Xn45NlKZjcL5dJOV35NsrEkNSEWfmM",
    authDomain: "sheilatte.firebaseapp.com",
    projectId: "sheilatte",
    storageBucket: "sheilatte.firebasestorage.app",
    messagingSenderId: "243830659691",
    appId: "1:243830659691:web:fa74978c7add9d8db36f2e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp
};


const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');

        const nama = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (!nama || !email || !phone || !subject || !message) {
            formMessage.textContent = "Mohon isi semua kolom terlebih dahulu.";
            formMessage.className = "form-message error";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Mengirim...";

        try {
            await addDoc(collection(db, "messages"), {
                nama,
                email,
                phone,
                subject,
                message,
                createdAt: serverTimestamp()
            });

            formMessage.textContent =
                "Pesan berhasil dikirim. Terima kasih sudah menghubungi Sheilatte!";

            formMessage.className = "form-message success";
            form.reset();

        } catch (error) {
            console.error("Firebase error:", error);

            formMessage.textContent =
                "Pesan gagal dikirim. Silakan coba lagi.";

            formMessage.className = "form-message error";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Kirim Pesan";
        }
    });
}
