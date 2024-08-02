import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoFormComponent from "./components/TodoFormComponent";
import TodoList from "./components/TodoListComponent";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
const baseUrl = "http://localhost:9000";
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await fetch(`${baseUrl}/task`);
        if (!res) {
          throw new Error("Faild to get");
        }
        const data = await res.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []);
  const toggleComplete = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };

        const response = await fetch(`${baseUrl}/task/` + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        });

        if (!response.ok) {
          throw new Error(`Error updating task: ${response.statusText}`);
        }
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const deleteTodo = (id: string) => {
    fetch(`${baseUrl}/task/` + id, {
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
      fetch(`${baseUrl}/task`, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((reson) => reson.json())
        .then((data) => setTodos([...todos, data]))
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const updateTodo = async (id: string, newText: string) => {
    const toDosUpdate = todos.find((todo) => todo.id === id);
    if (toDosUpdate) {
      const updatedTodo = { ...toDosUpdate, text: newText };

      try {
        const response = await fetch(`${baseUrl}/task/` + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        });

        if (!response.ok) {
          throw new Error(`Error updating task: ${response.statusText}`);
        }

        const data = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? data : todo))
        );
        setEditingTodo(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col justify-center items-center ">
        <div className=" max-w-[700px] w-full">
          <TodoHeader />
          <TodoFormComponent
            addTodo={addTodo}
            editingTodo={editingTodo}
            updateTodo={updateTodo}
          />
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
