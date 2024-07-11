import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import crossSvg from '../../images/icon-cross.svg';
import updateSvg from '../../images/icon-update.svg';
import editSvg from '../../images/icon-edit.svg';
import './todoItem.css';

function TodoItem({ todo }) {
  const { id, title, completed } = todo;
  const { updateTodo, removeTodo, completeTodo } = useTodoContext();

  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [name, setName] = useState(title);

  const handleUpdateTodo = () => {
    setToggleUpdate(!toggleUpdate);
    if (name != '') {
      updateTodo({
        id,
        title: name,
      });
    }
  };

  const handleRemoveTodo = () => removeTodo(id);
  const handleCompleteTodo = (e) => completeTodo(e);
  const isCompleted = completed ? 'checked' : '';

  // const classCheckbox = `${completed ? 'hidden' : ''}`;

  return (
    <li>
      {/* checkbox - see if it is completed or not */}
      <div className="list">
        <input
          id={id}
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          value={id}
          onChange={(e) => handleCompleteTodo(e)}
        />
        {/* show Input box if edit is clicked else show title */}
        {toggleUpdate ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="todo-update"
            type="text"
          />
        ) : (
          <div className="text">{title}</div>
        )}
      </div>
      {/* Update or edit todos*/}
      <div className="iconList">
        <span onClick={handleUpdateTodo}>
          {toggleUpdate ? (
            <img src={updateSvg} alt="updateIcon" />
          ) : (
            <img src={editSvg} alt="editIcon" />
          )}
        </span>
        <span onClick={handleRemoveTodo}>
          <img src={crossSvg} alt="crossIcon" />
        </span>
      </div>
    </li>
  );
}

export default TodoItem;
