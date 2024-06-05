import { getDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "./config";
import { auth } from "../database/config";

/**
 * Signs up a user for an activity at a specified day and time.
 * Updates the user's schedule in the Firestore database.
 * 
 * @param {string} activity - The activity to sign up for.
 * @param {string} day - The day of the week for the activity.
 * @param {string} time - The time slot for the activity.
 * @returns {Promise<Object>} The updated user data with the new activity added.
 */
export const userActivitySignUp = async (activity, day, time) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const updatedSchedule = { ...userData.schedule };

      // Check if a day of the week is being stored
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
    return false;
  }
};

/**
 * Updates the user's activities in the Firestore database.
 * 
 * @param {Object} updatedData - The updated user data including the new or modified schedule.
 * @returns {Promise<void>} A promise that resolves when the update is successful, or rejects with an error.
 */
export const handleUpdateActivities = async (updatedData) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  updateDoc(userDocRef, updatedData)
    .then(() => {
      // console.log("Activity added to user document successfully");
    })
    .catch((error) => {
      console.error("Error adding activity to user document: ", error);
    });
};

/**
 * Removes an activity from a user's schedule on a specified day and time.
 * If the specified time is the only activity for the day, the entire day is removed from the schedule.
 * 
 * @param {string} day - The day of the week from which to remove the activity.
 * @param {string} time - The time slot of the activity to remove.
 * @returns {Promise<boolean>} True if the activity was successfully removed, false otherwise.
 */
export const removeActivity = async (day, time) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const daySchedule = userData.schedule[day];

      if (
        daySchedule &&
        Object.keys(daySchedule).length === 1 &&
        daySchedule.hasOwnProperty(time)
      ) {
        const updatedActivities = {};
        updatedActivities[`schedule.${day}`] = deleteField();
        await updateDoc(userDocRef, updatedActivities);
      } else {
        const updatedActivities = {};
        updatedActivities[`schedule.${day}.${time}`] = deleteField();
        await updateDoc(userDocRef, updatedActivities);
      }
      console.log("Activity removed successfully");
      return true;
    } else {
      console.log("Document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error removing activity: ", error);
    return false;
  }
};