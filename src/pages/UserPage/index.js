import "./styles.scss";
import { auth } from "../../database/config";
import PageContainer from "../../components/PageContainer";
import { useEffect, useState } from "react";
import * as database from "../../database";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

export default function UserPage() {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user.displayName);
        }
        setIsLoading(false);
      });
    })();
  }, [isLoading]);

  /**
   * Handles the sign-out process.
   * 
   * Prevents the default form submission behavior and signs out the current user
   * using the `userSignOut` method from the database module.
   *
   */
  const handleSignOut = () => {
    database.userSignOut(auth.currentUser.email);
    navigate("/login");
  };

  // Render loading indicator while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title={currentUser} className={"user-page"}>
      {auth.currentUser ? (
        <>
          <article>
            <Outlet />

            <p>This is where users are redirected to on login</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </article>

          {/* Side Menu */}
          <aside>
            <NavLink to="/user" end>Main</NavLink>
            <NavLink to="/user/bookings">Bookings</NavLink>
          </aside>
        </>
      ) : (
        <div>Not Logged In</div>
      )}
    </PageContainer>
  );
}
