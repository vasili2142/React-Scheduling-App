import "./styles.scss";
import PageContainer from "../../components/PageContainer";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../database/config";
import { auth } from "../../database/config";

export default function SchedulePage() {
  console.log("auth", auth);

  const currentUser = auth.currentUser.uid;

  const schedule = {
    sunday: {
      "9:00 AM": "Yoga",
      "11:00 AM": "Brunch",
      "3:00 PM": "Gardening",
    },
    monday: {
      "10:00 AM": "Team Meeting",
      "2:00 PM": "Coding Session",
    },
    tuesday: {
      "8:00 AM": "Jogging",
      "1:00 PM": "Lunch with Friends",
      "6:00 PM": "Movie Night",
    },
    wednesday: {
      "9:30 AM": "Doctor's Appointment",
      "4:00 PM": "Grocery Shopping",
    },
    thursday: {
      "10:00 AM": "Client Meeting",
      "3:00 PM": "Presentation Preparation",
    },
    friday: {
      "12:00 PM": "Lunch",
      "5:00 PM": "Happy Hour",
    },
    saturday: {
      "10:00 AM": "Hiking",
      "2:00 PM": "Picnic",
    },
  };

  const handleActivity = (activity, day, time) => {
    // Retrieve user document
    const userDocRef = doc(db, "users", currentUser);

    // Fetch existing document data
    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          // Merge existing data with new activity
          const userData = doc.data();
          let updatedSchedule = { ...userData.schedule };

          // If the day already exists in the schedule, append the new activity to it
          if (updatedSchedule[day]) {
            updatedSchedule[day][time] = activity;
          } else {
            // If the day does not exist, create a new entry for it
            updatedSchedule[day] = {
              [time]: activity,
            };
          }

          const updatedData = {
            ...userData,
            schedule: updatedSchedule,
          };

          // Update user document with merged data
          updateDoc(userDocRef, updatedData)
            .then(() => {
              console.log("Activity added to user document successfully");
            })
            .catch((error) => {
              console.error("Error adding activity to user document: ", error);
            });
        } else {
          console.error("User document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error fetching user document: ", error);
      });
  };

  /**
   * Renders JSX elements for each day, and its activities, allowing users to sign up for different activities.
   *
   * This function iterates over the schedule object, creating a div for each day. Within each div, is a list of the activities available for that day, each with a sign-up button.
   *
   * @param {Object} schedule - The schedule object containing days as keys and activities as values.
   * @returns {JSX.Element[]} An array of JSX elements representing the schedule.
   */
  const handleActivities = (schedule) => {
    return Object.entries(schedule).map(([day, activities]) => (
      <div key={day}>
        <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
        <ul>
          {Object.entries(activities).map(([time, activity]) => (
            <li key={time}>
              <span className="schedule-sign-up-button">
                <button onClick={() => handleActivity(activity, day, time)}>
                  Sign Up
                </button>
              </span>
              {time} - {activity}
            </li>
          ))}
        </ul>
        <hr />
      </div>
    ));
  };

  return (
    <PageContainer title="Schedule" className="schedule-page">
      {handleActivities(schedule)}
      <button>Hello World</button>
    </PageContainer>
  );
}
