import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    orderBy,
    query,
    arrayUnion,
    arrayRemove
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

const db = getFirestore();

export const createPost = async (textPost, userEmail) => {
    try {
        const docRef = await addDoc(collection(db, "post"), {
            textPost: textPost,
            userEmail: userEmail,
            date: new Date(),
            like: [],

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
        // console.log(`${doc.id} => ${doc.data()}`);
        arrPost.push({ ...timeline, id: doc.id });
    });
    return arrPost;
}

export const like = async (idPost, userEmail, arrayLike) => {
    const docId = doc(db, "post", idPost);
    console.log(idPost);
    // const post = await getDoc(docId);
    // console.log(post.data());
    // const likes = post.data().like;
    return await updateDoc(docId, {
        like: arrayUnion(userEmail),
    });
};

export const deslike = async(idPost, userEmail, arrayLike) =>{
    const docId = doc(db, "post", idPost);
    console.log(idPost);
    return await updateDoc(docId, {
        like: arrayRemove(userEmail),
    });
}