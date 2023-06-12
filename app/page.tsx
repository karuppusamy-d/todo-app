"use client";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useTodoContext } from "@/components/contexts/useTodoContext";
import TodoCard from "@/components/TodoCard";

const Home = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const { todos } = useTodoContext();

  useEffect(() => {
    // Redirect if user not logged in
    if (!currentUser) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="min-h-screen p-8 grid gap-8">
      {todos.map((todo, i) => {
        return <TodoCard key={i} todo={todo} />;
      })}
    </div>
  );
};

export default Home;
