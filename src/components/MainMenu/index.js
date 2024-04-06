import './styles.scss';
import { NavLink } from 'react-router-dom';

import Dropdown from "react-bootstrap/Dropdown";

export default function MainMenu() {
  return (
    <nav className="main">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/schedule">Schedule</NavLink>
      
      <Dropdown>
        <Dropdown.Toggle variant="none" id="dropdown-basic">
        User
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <NavLink to="/user">User Main</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
}