import {
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

export const createPost = async (text, email) => {
  try {
    const docRef = await addDoc(collection(db, "post"), {
      textPost: text,
      userEmail: email,
      date: new Date(),
      like: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPost = async () => {
  const arrPost = [];
  const orderFirestore = query(collection(db, "post"), orderBy("date"));
  const querySnapshot = await getDocs(orderFirestore);
  querySnapshot.forEach((docPost) => {
    const timeline = docPost.data();
    // console.log(`${doc.id} => ${doc.data()}`);
    arrPost.push({ ...timeline, id: docPost.id });
  });
  return arrPost;
};

export const like = async (idPost, userEmail) => {
  try {
    const docId = doc(db, "post", idPost);
    console.log(idPost);
    // const post = await getDoc(docId);
    // console.log(post.data());
    // const likes = post.data().like;
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
  console.log(text);
  return updateDoc(postIdEdit, { textPost: text });
};

export function deletePost(item) {
  return deleteDoc(doc(db, "post", item));
}
