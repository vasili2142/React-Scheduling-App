import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../database/config";
import { auth } from "../database/config";
/**
 * Reads the current users from firestore and returns an array of user data.
 * @returns Array of user data from firestore
 */
export const read = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    const user = {
      ...doc.data(),
      // id: doc.id,
    };
    data.push(user);
  });

  return data;
};

export const readActivities = async () => {
  if (!auth.currentUser) {
    console.log("No user logged in");
    return false;
  }
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return docSnap.data();
};

export const checkLoggedIn = (user) => {
  console.log("Current User:", user);
};

