export const getAuth = jest.fn()
  .mockReturnValue({
    currentUser: {
      email: "user@user.com",
      name: "User Name",
    },
  });
export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const signInWithPopup = jest.fn();
export const signOut = jest.fn();
export const onAuthStateChanged = jest.fn();
export const updateProfile = jest.fn();

export const getFirestore = jest.fn();
export const collection = jest.fn();
export const addDoc = jest.fn();
export const getDocs = jest.fn();
export const updateDoc = jest.fn();
export const orderBy = jest.fn();
export const query = jest.fn();
export const arrayUnion = jest.fn();
export const arrayRemove = jest.fn();
export const doc = jest.fn();
export const deleteDoc = jest.fn();
export const initializeApp = () => ({});
