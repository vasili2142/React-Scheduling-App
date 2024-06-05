import "./styles.scss";
import PageContainer from "../../components/PageContainer";
import * as database from '../../database/';
import { useState } from 'react';

export default function SchedulePage() {
  const [registeredClasses, setRegisteredClasses] = useState([]);

  const schedule = {
    sunday: {
      "11:00": "All Levels",
      "12:00": "Tabata S&C",
      "12:30": "Competitor Training",
    },
    monday: {
      "17:30": "Fundamentals",
      "18:30": "All Levels",
      "19:30": "Competitor Training",
    },
    tuesday: {
      "17:00": "Youth Competitor Training",
      "17:30": "Youth Boxing",
      "18:30": "All Levels",
      "19:30": "Techincal",
    },
    wednesday: {
      "17:30": "Youth Boxing",
      "18:30": "Fundamentals",
      "19:30": "Women's Only",
    },
    thursday: {
      "17:00": "Youth Competitor Training",
      "17:30": "Youth Boxing",
      "18:30": "All Levels",
      "19:30": "Techincal/Competitor",
    },
    friday: {
      "17:30": "Fundamentals",
      "18:30": "Youth Competition",
    },
    saturday: {
      "All Day": "Open Gym",
    },
  };

  const validate = [];

  /**
   * Handles the activity sign-up process.
   *
   * This function is called when a user clicks the sign-up button for an activity. It registers the user for the selected activity by calling the `userActivitySignUp` method from the `database` module. It then updates the `validate` array with a confirmation message and updates the `registeredClasses` state with the new list of registered classes.
   *
   * @param {string} activity - The name of the activity the user is signing up for.
   * @param {string} day - The day of the week the activity is on.
   * @param {string} time - The time at which the activity takes place.
   */
  const handleActivity = async (activity, day, time) => {
    await database.userActivitySignUp(activity, day, time);
    validate.push(`You've signed up for ${activity} on ${day} at ${time}`);

    // console.log("validate", validate);
    setRegisteredClasses([...registeredClasses, validate]);
  };

  /**
   * Renders JSX elements for each day, and its activities, allowing users to sign up for different activities.
   *
   * This function iterates over the schedule object, creating a div for each day. Within each div, is a list of the activities available for that day, each with a sign-up button.
   *
   * @param {Object} schedule - The schedule object containing days as keys and activities as values.
   * @returns {JSX.Element[]} An array of JSX elements representing the schedule.
   */
  const handleRenderSchedule = (schedule) => {
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
      {/* Conditionally render the classes that were signed up for */}
      {registeredClasses.length > 0 && (
        <div>
          Registered Classes:
          <ul>
            {registeredClasses.map((regClass, index) => (
              <li key={index}>{regClass}</li>
            ))}
          </ul>
        </div>
      )}
      {handleRenderSchedule(schedule)}
    </PageContainer>
  );
}
