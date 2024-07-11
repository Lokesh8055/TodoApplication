import {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

const ThemeContext = createContext();

const STATE = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const ThemeProvider = (props) => {
  // Check Data if present in local storage else initial state
  const getTheme = JSON.parse(localStorage.getItem('theme'));

  const [theme, setTheme] = useState(
    getTheme ? getTheme : STATE.DARK
  );

  const toggleTheme = () => {
    setTheme((curr) =>
      curr === STATE.LIGHT ? STATE.DARK : STATE.LIGHT
    );
  };

  // setItem in localStorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
