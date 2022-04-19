import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
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
    const orderFirestore = query(collection(db, "post"), orderBy("date"));
    const querySnapshot = await getDocs(orderFirestore);
    querySnapshot.forEach((doc) => {
        const timeline = doc.data();
        //console.log(`${doc.id} => ${doc.data()}`);
        arrPost.push({...timeline, id: doc.id});
    });
    return arrPost;
    
}

export function deletePost(item) {
    return deleteDoc(doc(db, "post", item)); 
}