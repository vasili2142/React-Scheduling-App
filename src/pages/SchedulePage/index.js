import "./styles.scss";
import PageContainer from "../../components/PageContainer";
import * as database from '../../database/';

export default function SchedulePage() {

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
      "18:30": "Yout Competition",
    },
    saturday: {
      "All Day" : "Closed",
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
