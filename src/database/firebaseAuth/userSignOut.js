import { signOut } from "firebase/auth";
import { auth } from "../config";

export const userSignOut = (currentUser) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log(`${currentUser} logged out successfully`);
    })
    .catch((error) => {
      // An error happened.
      console.log('Error:', error);
    });
};
