import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

const db = getFirestore();

export const createPost = async (textPost) => {
    try {
        const docRef = await addDoc(collection(db, "post"), {
            post: textPost,
            userId: 1,
            data: new Date(),
            like: 1,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}