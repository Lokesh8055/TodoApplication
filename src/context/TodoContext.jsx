import {
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
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
    title: 'wake up in the morning',
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
    setTodoList((todoList) =>
      todoList.filter((todo) => todo.id !== id)
    );
  };

  // Update Todo
  const updateTodo = ({ id, title }) => {
    setTodoList((todoList) =>
      todoList.map((item) =>
        item.id === id ? { ...item, title } : item
      )
    );
  };

  // Complete Todo
  const completeTodo = (e) => {
    const todoId = e.target.value;
    const isChecked = e.target.checked;

    const updatedTodos = todoList.map((item) =>
      item.id === todoId ? { ...item, completed: isChecked } : item
    );

    setTodoList(updatedTodos);
  };

  // setItem in localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  // Drag and Drop functionality
  const getTaskPosition = (id) =>
    todoList.findIndex((todo) => todo.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTodoList((todoList) => {
      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);

      return arrayMove(todoList, originalPosition, newPosition);
    });
  };

  // Touch + Keyboard controls
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 100ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const itemsLeft = todoList.length;

  const FILTER_LIST = [
    {
      id: 1,
      name: 'All',
      onClick: () => console.log('all'),
    },
    {
      id: 2,
      name: 'Active',
      onClick: () => console.log('active'),
    },
    {
      id: 3,
      name: 'Completed',
      onClick: () => console.log('Completed'),
    },
  ];

  return (
    <TodoContext.Provider
      value={{
        todoList,
        itemsLeft,
        handleDragEnd,
        sensors,
        addTodo,
        removeTodo,
        updateTodo,
        completeTodo,
        FILTER_LIST,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
