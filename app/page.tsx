"use client";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useTodoContext } from "@/components/contexts/useTodoContext";
import TodoCard from "@/components/TodoCard";
import NewTodo from "@/components/Popup/NewTodo";
import Popup from "@/components/Popup";
import Loading from "@/components/Loading";

const Home = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const { loading, todos } = useTodoContext();
  const [showNewTodo, setShowNewTodo] = useState(false);
  const toggleNewTodo = () => setShowNewTodo((curr) => !curr);

  useEffect(() => {
    // Redirect if user not logged in
    if (!currentUser) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-4 px-2 xs:px-4 pb-8 md:px-8 sm:py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-4 grid-cols-1">
          <h2 className="text-2xl font-bold">All Todos</h2>
          <button
            className="btn"
            onClick={() => setShowNewTodo((curr) => !curr)}
          >
            Add Todo
          </button>
        </div>
        {todos.map((todo, i) => {
          return <TodoCard key={i} todo={todo} />;
        })}
      </div>
      {/* New projects popup */}
      <Popup showPopup={showNewTodo} togglePopup={toggleNewTodo}>
        <NewTodo togglePopup={toggleNewTodo} />
      </Popup>
    </div>
  );
};

export default Home;
