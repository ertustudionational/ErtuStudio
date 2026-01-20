// ===== SAYFA GEÇİŞLERİ =====
const homePage = document.getElementById("homePage");
const focusPage = document.getElementById("focusPage");

window.openFocusTimer = function () {
  homePage.classList.remove("active");
  focusPage.classList.add("active");
  window.scrollTo(0, 0);
};

window.goHome = function () {
  focusPage.classList.remove("active");
  homePage.classList.add("active");
  window.scrollTo(0, 0);
};

// ===== FOTO BÜYÜTME MODAL =====
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

window.openImage = function (src) {
  modalImg.src = src;
  imageModal.style.display = "flex";
};

window.closeImage = function () {
  imageModal.style.display = "none";
  modalImg.src = "";
};

// ESC ile kapatma
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeImage();
  }
});

// ===== FIREBASE YORUMLAR (AYNEN KORUNDU) =====
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

const commentsDiv = document.getElementById("comments");
const form = document.getElementById("commentForm");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

async function loadComments() {
  commentsDiv.innerHTML = "";
  const snapshot = await getDocs(collection(db, "comments"));
  snapshot.forEach((doc) => {
    const d = doc.data();
    commentsDiv.innerHTML += `<p><strong>${d.name}</strong>: ${d.comment}</p>`;
  });
}

loadComments();

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
