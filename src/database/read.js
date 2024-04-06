import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/config";

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
      id: doc.id,
    };
    data.push(user);
  });

  return data;
};

export const checkLoggedIn = (user) => {
  console.log("Current User:", user);
};

