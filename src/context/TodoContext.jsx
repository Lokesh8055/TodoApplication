import {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import { v6 } from 'uuid';

const TodoContext = createContext();

const INITIAL_STATE = [
  {
    id: v6(),
    title: 'one',
    completed: false,
  },
];

export const TodoProvider = (props) => {
  // Check Data if present in local storage else initial state
  const getTodos = JSON.parse(localStorage.getItem('todos'));

  const [todoList, setTodoList] = useState(
    getTodos ? getTodos : INITIAL_STATE
  );

  // Add Todo
  const addTodo = (todo) => {
    setTodoList((prevState) => [...prevState, todo]);
  };

  // Remove Todo
  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id != id));
  };

  // Update Todo
  const updateTodo = (todo) => {
    let index = -1;
    const newTodos = [...todoList];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === todo.id) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      newTodos[index] = todo;
      setTodoList(newTodos);
    }
  };

  // Complete Todo
  const completeTodo = (e) => {
    const filterTodos = todoList.map((item) => {
      if (item.id === e.target.value) {
        item.completed = false;
        if (e.target.checked) {
          item.completed = true;
        }
      }
      return item;
    });
    setTodoList(filterTodos);
  };

  // setItem in localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addTodo,
        removeTodo,
        updateTodo,
        completeTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
