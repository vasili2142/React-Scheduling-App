import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../database/config";
import { auth } from "../config";

/**
 * Registers user
 * @param {string} email Email address the user is signing up with
 * @param {string} password The password the user is signing up with
 * @param {string} displayName The display name the user is signing up with
 * @return User login data
 */
export const userRegister = async (email, password, displayName) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const userId = userCredential.user.uid;

      setDoc(doc(db, "users", userId), {
        uid: userId,
        email,
        password,
        displayName,
      });

      // Sets user display name in firestore auth
      updateProfile(auth.currentUser, {
        displayName,
      })
        .then(() => {
          // Profile updated
        })
        .catch((error) => {
          console.log("error updating display name", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Code:", errorCode);
      console.log("Error Message:", errorMessage);
    });
};
