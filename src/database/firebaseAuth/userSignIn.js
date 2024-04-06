import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const userSignIn = (email, password) => {

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      
      console.log("Error Code:", errorCode);
      console.log("Error Message:", errorMessage);
    });
};
