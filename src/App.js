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

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />

        <Route path="/user" element={<UserPage />} >
          <Route path="" element={<UserMainPage />} />
          <Route path="bookings" element={<UserBookingsPage />} />
        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
