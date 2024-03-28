import './styles/index.scss';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import Userpage from './pages/UserPage';

export default function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/schedule' element={<SchedulePage />} />
          <Route path='/user' element={<Userpage />} />
        </Routes>
      <Footer />
    </>
  );
}
