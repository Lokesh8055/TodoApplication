import TodoItem from '../TodoItem';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import './todoList.css';

function TodoList({ todoList }) {
  return (
    <div className="todos">
      <ul>
        <SortableContext
          items={todoList}
          strategy={verticalListSortingStrategy}
        >
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
}

export default TodoList;
