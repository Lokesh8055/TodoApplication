import { useEffect } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import Header from './Header';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Container = () => {
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <TodoInput />
        <TodoList />
      </div>
    </>
  );
};

export default Container;
