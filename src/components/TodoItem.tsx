import React from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  startEditing: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  toggleComplete,
  deleteTodo,
  startEditing,
}) => {
  return (
    <>
      <div className="flex justify-between items-center  text-left bg-gray-200 py-3 px-5 my-2 rounded font-semibold">
        <div
          className={`flex-1 flex items-center ${todo.completed ? "line-through" : ""}`}
          onClick={() => toggleComplete(todo.id)}
        > <input  className="w-5 h-5  mr-2 rounded" type="checkbox" checked= {todo.completed} />
          {todo.text}
        </div>
        <button
          className="ml-2 bg-yellow-500 text-white px-6 py-2 rounded"
          onClick={() => startEditing(todo)}
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="ml-2 bg-red-500 text-white px-6 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TodoItem;
