import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "./exports.js";

export const auth = getAuth();
const provider = new GoogleAuthProvider();
// const user = auth.createUser;

export function createUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      return user;
    });
}

export function userLogout() {
  return signOut(auth);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    });
}

export function googleLogin() {
  return signInWithPopup(auth, provider)
    .then(() => {
    }).catch(() => {
    });
}

export function verifyUserLogged(callback) {
  return onAuthStateChanged(auth, (userLogged) => {
    callback(userLogged !== null);
  });
}
