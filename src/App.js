import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserMainPage from "./pages/UserPage/Main";
import UserBookingsPage from "./pages/UserPage/Bookings";
import SchedulePage from "./pages/SchedulePage";
import { useEffect, useState } from "react";
import { db } from "./database/config";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [userInfo, setUserInfo] = useState([]);

  /**
   * An effect hook that fetches user data from the Firebase Firestore database.
   *
   * @returns {Promise<void>} A promise that resolves when the data is fetched.
   */
  useEffect(() => {
    (async () => {
      const data = [];
      const querySnap = await getDocs(collection(db, "users"));
      querySnap.forEach((doc) => {
        data.push({
          password: doc.data().password,
          email: doc.data().email,
          displayName: doc.data().displayName,
        });
      });
      setUserInfo(data);
    })();
  }, []);

  /**
   * A function that exports the user data.
   *
   * @returns {Array} An array of user objects.
   */
  const exportUserData = () => {
    const userData = userInfo;
    return userData;
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />

        <Route path="/user" element={<UserPage />}>
          <Route path="" element={<UserMainPage />} />
          <Route path="bookings" element={<UserBookingsPage />} />
        </Route>

        <Route
          path="/register"
          element={<RegisterPage onUserData={exportUserData} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
