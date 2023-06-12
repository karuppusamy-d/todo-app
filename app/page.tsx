"use client";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { Todos } from "@/components/types/todo";
import TodoCard from "@/components/TodoCard";

const myTodos: Todos = {
  "1": {
    title: "My todo",
    description: "This is an sample todo",
    date: "2023-06-12",
    important: false,
    completed: false,
    subTodos: [
      {
        title: "Sub task 1",
        description: "This is an sample todo",
        date: "2023-06-12",
        important: false,
        completed: true,
      },
      {
        title: "Sub task 2",
        description: "This is an sample todo",
        date: "2023-06-12",
        important: true,
        completed: false,
      },
    ],
  },
  "2": {
    title: "My todo",
    description: "This is an sample todo",
    date: "2023-06-12",
    important: false,
    completed: false,
    subTodos: [
      {
        title: "Sub task 1",
        description: "This is an sample todo",
        date: "2023-06-12",
        important: false,
        completed: true,
      },
      {
        title: "Sub task 2",
        description: "This is an sample todo",
        date: "2023-06-12",
        important: true,
        completed: false,
      },
    ],
  },
};

const Signup = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [todos, setTodos] = useState<Todos>({});

  useEffect(() => {
    // Redirect if user not logged in
    if (!currentUser) {
      router.push("/login");
    } else {
      setTodos(myTodos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="min-h-screen p-8 grid gap-8">
      {Object.keys(todos).map((key, i) => {
        return <TodoCard key={i} todo={todos[key]} />;
      })}
    </div>
  );
};

export default Signup;
