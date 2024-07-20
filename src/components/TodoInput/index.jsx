import { useState } from 'react';
import { v6 } from 'uuid';
import './todoInput.css';

function TodoInput({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleAddTodo = (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      addTodo({
        id: v6(),
        title,
        completed: false,
      });
      setTitle('');
    }
  };

  const handleOnChange = (e) => setTitle(e.target.value);

  return (
    <div className="todo-input">
      <input
        value={title}
        onChange={handleOnChange}
        placeholder="Create a new todo..."
        aria-label="todo-input"
        type="text"
        onKeyDown={handleAddTodo}
        className="todo-input"
      />
    </div>
  );
}

export default TodoInput;
