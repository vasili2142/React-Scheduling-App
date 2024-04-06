import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { auth } from "../database/config";

export const userActivitySignUp = async (activity, day, time) => {
  // Retrieve user document
  const userDocRef = doc(db, "users", auth.currentUser.uid);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();

      let updatedSchedule = { ...userData.schedule };

      updatedSchedule[day]
        ? (updatedSchedule[day][time] = activity)
        : (updatedSchedule[day] = { [time]: activity });

      const updatedData = {
        ...userData,
        schedule: updatedSchedule,
      };

      handleUpdateActivities(updatedData);
      return updatedData;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const handleUpdateActivities = async (updatedData) => {
  const userDocRef = doc(db, 'users', auth.currentUser.uid)
  updateDoc(userDocRef, updatedData)
    .then(() => {
      console.log("Activity added to user document successfully");
    })
    .catch((error) => {
      console.error("Error adding activity to user document: ", error);
    });
};
