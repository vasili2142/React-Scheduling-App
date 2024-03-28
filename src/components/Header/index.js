import './styles.scss';
import { appName } from "../../includes/variables";
import { FaRegCalendarAlt } from "react-icons/fa";
import MainMenu from '../MainMenu';


export default function Header() {
  return (
    <>
      <header className="main">
        <FaRegCalendarAlt />
        <div>{appName}</div>
      </header>
      <MainMenu />
    </>
  );
}
