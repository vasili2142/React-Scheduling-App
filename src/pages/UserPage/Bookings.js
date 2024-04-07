import { useState, useEffect } from "react";
import * as database from "../../database";

export default function UserBookingsPage() {
  const [userActivities, setUserActivities] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await database.readActivities();
      if (result.schedule) {
        const result2 = Object.entries(result.schedule);
        setUserActivities(result2);
      }
    })();
  }, [refreshCounter]);

  return (
    <>
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
                {Object.entries(activity).map(([time, activity], index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        database.removeActivity(day, time).then(() => {
                          setRefreshCounter(refreshCounter + 1);
                        })
                      }
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
    </>
  );
}
