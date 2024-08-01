// import React from 'react'
import { useState, useEffect,useRef } from "react";
interface TodoFormComponentProps {
  addTodo: (text: string) => void;
  editingTodo: Todo | null;
}
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
const TodoFormComponent: React.FC<TodoFormComponentProps> = ({
  addTodo,
  editingTodo,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null)
  
  useEffect(() => {
    if (editingTodo) {
      setValue(editingTodo.text );  
    } else {
      setValue("");
    }
  }, [editingTodo]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value.trim());
      setValue("");
      // fetch(`http://localhost:9000/task/`, {
      //   method: "PUT",
      //   body: JSON.stringify({text: }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
    }
  };
  const handleClick = () =>{
      inputRef.current.focus();
  }
  return (
    <>
      <form action="" className="flex  w-full" onSubmit={handleSubmit}>
        <label htmlFor="todo" className="max-w-[590px]  w-full">
          <input
            className="p-5 border shadow-md border-slate-400 font-bold rounded-xl max-w-[590px] w-full"
            type="text"
            value={value}
            ref={inputRef}
            name="todo"
            id="to "
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your task"
          />
        </label>
        <button onClick={handleClick} className="p-5 bg-blue-600 text-white rounded-xl font-bold ">
          {editingTodo ? `Update task` : `Add task`}
        </button>
      </form>
    </>
  );
};

export default TodoFormComponent;
