import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
interface Props {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  startEditing: (todo: Todo) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  toggleComplete,
  deleteTodo,
  startEditing,
}) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          startEditing={startEditing}
        />
      ))}
    </div>
  );
};

export default TodoList;
