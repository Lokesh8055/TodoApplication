import './header.css';
import iconMoon from '../../images/icon-moon.svg';
import iconSun from '../../images/icon-sun.svg';
import { TODO_CONST } from '../../constants';

const Header = ({ theme, toggleTheme }) => {
  const image = theme === TODO_CONST.THEME.DARK ? iconSun : iconMoon;
  return (
    <header>
      <h1>{TODO_CONST.HEADING}</h1>
      <img src={image} alt="theme-icon" onClick={toggleTheme} />
    </header>
  );
};

export default Header;
