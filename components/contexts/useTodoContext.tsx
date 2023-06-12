"use client";
import {
  ReactElement,
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import axios, { AxiosResponse } from "axios";
import { Todo, TodoWithId } from "../types/todo";
import { useAuthContext } from "./useAuthContext";

// Type definitions for useTodoContext
type TodoProviderType = ({ children }: { children: ReactNode }) => ReactElement;
type AddTodo = (todo: Todo) => Promise<boolean>;
type UpdateTodo = (todo: TodoWithId) => Promise<boolean>;
type DeleteTodo = (todo: TodoWithId) => Promise<boolean>;
type ContextValue = {
  todos: TodoWithId[];
  loading: boolean;
  addTodo: AddTodo;
  updateTodo: UpdateTodo;
  deleteTodo: DeleteTodo;
  refreshTodos: () => Promise<void>;
};

// Create the context
const TodoContext = createContext<ContextValue | undefined>(undefined);

// Use the context
const useTodoContext = (): ContextValue => {
  return useContext(TodoContext) as ContextValue;
};

// Create the provider
const TodoProvider: TodoProviderType = ({ children }) => {
  const [todos, setTodos] = useState<TodoWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    refreshTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const refreshTodos = async () => {
    if (currentUser?.access_token) {
      setLoading(false);
      axios
        .get<TodoWithId[]>("/api/todo", {
          headers: {
            Authorization: "Bearer " + currentUser.access_token,
          },
        })
        .then(({ data }) => {
          setTodos(data);
        })
        .finally(() => {
          setLoading(true);
        });
    }
  };

  const addTodo: AddTodo = async (todo: Todo) => {
    if (!currentUser?.access_token) {
      return false;
    }

    const res: AxiosResponse<TodoWithId> = await axios.put("/api/todo", todo, {
      headers: {
        Authorization: "Bearer " + currentUser.access_token,
      },
    });
    if (res.status === 200) {
      const newTodo = res.data;
      setTodos((curr) => [...curr, newTodo]);
      return true;
    }
    return false;
  };

  const updateTodo: UpdateTodo = async (todo: TodoWithId) => {
    if (!currentUser?.access_token) {
      return false;
    }
    const res: AxiosResponse<TodoWithId> = await axios.patch(
      "/api/todo",
      todo,
      {
        headers: {
          Authorization: "Bearer " + currentUser.access_token,
        },
      }
    );
    const updatedTodo = res.data;
    if (res.status === 200) {
      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id == updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
      return true;
    }
    return false;
  };

  const deleteTodo: DeleteTodo = async (todo: TodoWithId) => {
    if (!currentUser?.access_token) {
      return false;
    }
    const res: AxiosResponse = await axios.delete("/api/todo", {
      headers: {
        Authorization: "Bearer " + currentUser.access_token,
        id: todo.id,
      },
    });
    if (res.status === 200) {
      setTodos((todos) => {
        return todos.filter((t) => {
          if (t.id == todo.id) {
            return false;
          }
          return true;
        });
      });
      return true;
    }
    return false;
  };

  const value = {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos,
  };

  // Return the provider
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoProvider, useTodoContext };
export default TodoContext;
