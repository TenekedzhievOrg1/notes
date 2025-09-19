import { useEffect, useState } from "react";
import { Todo } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const useCrudHandlers = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/todos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodoHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const createdTodo = await res.json();

      setTodos((prev) => [...prev, createdTodo]);
      setNewTodo("");
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to create todo: ", err);
      setIsLoading(false);
      setError(err);
    }
  };

  const editTodoHandler = async (updatedTodo: Todo) => {
    const { id, title, completed } = updatedTodo;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to update todo:", err);
      setIsLoading(false);
      setError(err);
    }
  };

  const deleteTodoHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setIsLoading(false);
      setError(err);
    }
  };

  return {
    todos,
    error,
    isLoading,
    newTodo,
    setNewTodo,
    addTodoHandler,
    editTodoHandler,
    deleteTodoHandler,
  };
};
