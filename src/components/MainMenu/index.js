import './styles.scss';
import { NavLink } from 'react-router-dom';

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function MainMenu() {
  return (
    <nav className="main">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/schedule">Schedule</NavLink>
      
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        User
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <NavLink to="/user">User Main</NavLink>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
}