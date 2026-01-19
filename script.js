// Animasyon (eski kodun)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Yorumları yükle
const commentsDiv = document.getElementById("comments");

async function loadComments() {
  commentsDiv.innerHTML = "";
  const snapshot = await getDocs(collection(db, "comments"));
  snapshot.forEach(doc => {
    const d = doc.data();
    commentsDiv.innerHTML += `<p><strong>${d.name}</strong>: ${d.comment}</p>`;
  });
}
loadComments();

// Yorum ekle
document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "comments"), {
    name: name.value,
    comment: comment.value,
    createdAt: serverTimestamp()
  });

  e.target.reset();
  loadComments();
});
