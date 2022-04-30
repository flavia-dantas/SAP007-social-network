import {
  getAuth,
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
} from "./exports.js";

const db = getFirestore();

export const auth = getAuth();

export const createPost = async (text, email) => {
  try {
    const docRef = await addDoc(collection(db, "post"), {
      textPost: text,
      userEmail: email,
      userName: auth.currentUser.displayName,
      date: new Date(),
      like: [],
      uid: auth.currentUser.uid,
    });
    return docRef.id;
  } catch (e) {
    return null;
  }
};

export const getPost = async () => {
  const arrPost = [];
  const orderFirestore = query(collection(db, "post"), orderBy("date"));
  const querySnapshot = await getDocs(orderFirestore);
  querySnapshot.forEach((docPost) => {
    const timeline = docPost.data();
    arrPost.push({ ...timeline, id: docPost.id });
  });
  return arrPost;
};

export const like = async (idPost, userEmail) => {
  try {
    const docId = doc(db, "post", idPost);
    return await updateDoc(docId, {
      like: arrayUnion(userEmail),
    });
  } catch (e) {
    console.error("Não deu certo o like", e);
  } return arrayUnion;
};

export const dislike = async (idPost, userEmail) => {
  try {
    const docId = doc(db, "post", idPost);
    console.log(idPost);
    return await updateDoc(docId, {
      like: arrayRemove(userEmail),
    });
  } catch (e) {
    console.error("Não deu certo o deslike ", e);
  } return arrayRemove;
};

export const editPost = (idPost, text) => {
  const postIdEdit = doc(db, "post", idPost);
  return updateDoc(postIdEdit, { textPost: text });
};

export function deletePost(item) {
  return deleteDoc(doc(db, "post", item));
}
