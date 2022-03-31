import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

const db = getFirestore();

export const createPost = async (textPost, userEmail) => {
    try {
        const docRef = await addDoc(collection(db, "post"), {
            textPost: textPost,
            userEmail: userEmail,
            data: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}