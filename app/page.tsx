"use client";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useTodoContext } from "@/components/contexts/useTodoContext";
import TodoCard from "@/components/TodoCard";
import NewTodo from "@/components/Popup/NewTodo";
import Popup from "@/components/Popup";

const Home = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const { todos } = useTodoContext();
  const [showNewTodo, setShowNewTodo] = useState(false);
  const toggleNewTodo = () => setShowNewTodo((curr) => !curr);

  useEffect(() => {
    // Redirect if user not logged in
    if (!currentUser) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="min-h-screen p-8 grid gap-8">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">All Todos</h2>
        <button className="btn" onClick={() => setShowNewTodo((curr) => !curr)}>
          Add Todo
        </button>
      </div>
      {todos.map((todo, i) => {
        return <TodoCard key={i} todo={todo} />;
      })}
      {/* New projects popup */}
      <Popup showPopup={showNewTodo} togglePopup={toggleNewTodo}>
        <NewTodo togglePopup={toggleNewTodo} />
      </Popup>
    </div>
  );
};

export default Home;
