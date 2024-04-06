import "./styles.scss";
import PageContainer from "../../components/PageContainer";
import * as database from '../../database/';

export default function SchedulePage() {

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

  const handleActivity = async (activity, day, time) => {
    await database.userActivitySignUp(activity, day, time);
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
      {handleRenderSchedule(schedule)}
    </PageContainer>
  );
}
