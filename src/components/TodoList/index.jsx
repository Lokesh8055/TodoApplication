import { useTodoContext } from '../../context/TodoContext';
import TodoItem from '../TodoItem';
import './todoList.css';

function TodoList() {
  const { todoList } = useTodoContext();

  return (
    <div className="todos">
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
