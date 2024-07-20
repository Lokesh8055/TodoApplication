import './header.css';
import iconMoon from '../../images/icon-moon.svg';
import iconSun from '../../images/icon-sun.svg';

const Header = ({ theme, toggleTheme }) => {
  return (
    <div className="header">
      <h1>todo</h1>
      <img
        src={theme === 'dark' ? iconSun : iconMoon}
        alt="theme-icon"
        onClick={toggleTheme}
      />
    </div>
  );
};

export default Header;
