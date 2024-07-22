import TodoItem from '../TodoItem';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import './todoList.css';

function TodoList({ todoList }) {
  return (
    <div className="todos">
      <SortableContext
        items={todoList}
        strategy={verticalListSortingStrategy}
      >
        <ul role="list">
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

export default TodoList;
