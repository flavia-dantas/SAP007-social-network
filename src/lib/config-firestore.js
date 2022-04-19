import { getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc 
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

const db = getFirestore();

export const createPost = async (textPost, userEmail) => {
    try {
        const docRef = await addDoc(collection(db, "post"), {
            textPost: textPost,
            userEmail: userEmail,
            date: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getPost = async () => {
    const arrPost = [];
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach((itemPost) => {
        const timeline = itemPost.data();     
        arrPost.push({...timeline, id: itemPost.id});
        console.log(arrPost);
    });
    return arrPost;
    
}

export function deletePost(item) {
    return deleteDoc(doc(db, "post", item)); 
}