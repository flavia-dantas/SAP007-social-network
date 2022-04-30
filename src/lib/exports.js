export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js"; //eslint-disable-line

export {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  arrayUnion,
  arrayRemove,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js" //eslint-disable-line

export { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js" //eslint-disable-line