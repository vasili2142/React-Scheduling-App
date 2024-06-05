import { useState, useEffect } from "react";
import * as database from "../../database";

export default function UserBookingsPage() {
  const [userActivities, setUserActivities] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  /**
   * useEffect hook to fetch and update user activities when the component mounts or refreshCounter changes.
   */
  useEffect(() => {
    (async () => {
      const result = await database.readActivities();

      if (result.schedule) {
        const result2 = Object.entries(result.schedule);
        setUserActivities(result2);
      }
    })();
  }, [refreshCounter]);

  /**
   * Renders the user's activities in a sorted and structured format.
   *
   * @returns {JSX.Element[]} An array of JSX elements representing the user's activities.
   */
  return (
    <div>
      {userActivities
        .sort(([day1], [day2]) => {
          const order = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ];
          return order.indexOf(day1) - order.indexOf(day2);
        })
        .map(([day, activity], index) => (
          <div key={index}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            <ul>
              {/* Sort the activities by time within each day */}
              {Object.entries(activity)
                .sort(([time1], [time2]) => {
                  const [hours1, minutes1] = time1
                    .split(":")
                    .map((time1) => parseInt(time1));
                  const [hours2, minutes2] = time2
                    .split(":")
                    .map((time2) => parseInt(time2));
                  const updatedTime = hours1 + minutes1 - (hours2 + minutes2);

                  return updatedTime;
                })
                .map(([time, activity], index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        database.removeActivity(day, time).then(() => {
                          setRefreshCounter(refreshCounter + 1);
                        });
                      }}
                    >
                      Cancel
                    </button>{" "}
                    {`${time} - ${activity}`}
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
