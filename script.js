// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIadkhnM7RbwgB6nI29fi1M83mhk4Rmx0",
  authDomain: "ertustudio-comments.firebaseapp.com",
  projectId: "ertustudio-comments",
  storageBucket: "ertustudio-comments.firebasestorage.app",
  messagingSenderId: "143566612310",
  appId: "1:143566612310:web:55a6e5a5e5f970341a18f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧠 HTML elemanları
const commentsDiv = document.getElementById("comments");
const form = document.getElementById("commentForm");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

// 📥 Yorumları yükle
async function loadComments() {
  commentsDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "comments"));
  snapshot.forEach((doc) => {
    const d = doc.data();
    commentsDiv.innerHTML += `
      <p><strong>${d.name}</strong>: ${d.comment}</p>
    `;
  });
}

loadComments();

// 📤 Yorum ekle
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "comments"), {
    name: nameInput.value,
    comment: commentInput.value,
    createdAt: serverTimestamp()
  });

  form.reset();
  loadComments();
});
