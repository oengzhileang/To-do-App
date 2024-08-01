import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoFormComponent from "./components/TodoFormComponent";
import TodoList from "./components/TodoListComponent";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
const baseUrl = "http://localhost:9000"
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  useEffect(() => {
    const getTodo = async () =>{
      try{
          const res = await fetch (`${baseUrl}/task`)
          const data = await res.json();
          console.log(data);
          setTodos(data)
      } catch (error){
        console.log(error);
      }
    }
    getTodo();
  }, []);
  const toggleComplete = (id: string) => {
    // fetch("http://localhost:9000/task/"+id) ,{
    //   method: "PUT"
    // }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id: string) => {
    fetch(`http://localhost:9000/task/`+id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos(todos.filter((todo) => todo.id !== id));
        } else {
          console.log("Failed to delete the todo");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTodo = (text: string) => {
    if (editingTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, text } : todo
        )
      );
      setEditingTodo(null);
    } else {
      const newTodo = {
        id: `${todos.length + 1}`,
        text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      fetch("http://localhost:9000/task", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((reson) => reson.json())
        .then((data) => setTodos([...todos, data]))
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="mx-auto flex flex-col justify-center items-center ">
        <div className=" max-w-[700px] w-full">
          <TodoHeader />
          <TodoFormComponent addTodo={addTodo} editingTodo={editingTodo} />
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            startEditing={setEditingTodo}
          />
        </div>
      </div>
    </>
  );
};
export default App;
