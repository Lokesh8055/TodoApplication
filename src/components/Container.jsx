import { useEffect } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { useThemeContext } from '../context/ThemeContext';
import Header from './Header';
import TodoInput from './TodoInput';
import Footer from './Footer';
import TodoList from './TodoList';
import { useTodoContext } from '../context/TodoContext';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { TODO_CONST } from '../constants';

const Container = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { handleDragEnd, sensors, addTodo, todoList } =
    useTodoContext();

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
        <TodoInput addTodo={addTodo} />
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetecttion={closestCorners}
          modifiers={[restrictToVerticalAxis]}
        >
          <TodoList todoList={todoList} />
        </DndContext>
        <Footer />
      </div>
      <p className="reOrderText">{TODO_CONST.DRAG_AND_DROP}</p>
    </>
  );
};

export default Container;
