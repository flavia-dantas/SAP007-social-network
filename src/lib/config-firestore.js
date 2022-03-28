import { getFirestore} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

const db = getFirestore();

// export async function addDocument(){
//     const docRef = await addDoc(collection(db, "post"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
// //   };

// addDoc, collection 