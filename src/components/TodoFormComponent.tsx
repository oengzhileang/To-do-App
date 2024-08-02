// import React from 'react'
import { useState, useEffect, useRef } from "react";
interface TodoFormComponentProps {
  addTodo: (text: string) => void;
  editingTodo: Todo | null;
  updateTodo: (id: string, newText: string) => void;
}
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
const TodoFormComponent: React.FC<TodoFormComponentProps> = ({
  addTodo,
  editingTodo,
  updateTodo,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodo) {
      setValue(editingTodo.text);
    } else {
      setValue("");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo) {
      updateTodo(editingTodo.id, value.trim());
    } else {
      addTodo(value);
    }

    setValue("");
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <form action="" className="flex  w-full" onSubmit={handleSubmit}>
        <label htmlFor="todo" className="  w-full">
          <div>
            <input
              className="p-5 border shadow-md border-slate-400 font-bold rounded-l-lg max-w-[590px] w-full"
              type="text"
              value={value}
              ref={inputRef}
              name="todo"
              id="to "
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your task"
            />
            <button
              onClick={handleClick}
              className="p-5 bg-blue-600 border shadow-md border-slate-400 text-white rounded-r-lg font-bold  "
            >
              {editingTodo ? `Update` : `Add task`}
            </button>
          </div>
        </label>
      </form>
    </>
  );
};

export default TodoFormComponent;
