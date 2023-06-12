import React, { ReactElement, useState } from "react";
import { TodoWithId } from "./types/todo";
import Icon from "./Icons";
import { useTodoContext } from "./contexts/useTodoContext";

type Props = {
  todo: TodoWithId;
  innerTodo?: boolean;
};

const TodoCard = ({ todo, innerTodo }: Props): ReactElement => {
  const { deleteTodo } = useTodoContext();
  const handleDelete = () => {
    if (!innerTodo) deleteTodo(todo);
  };
  return (
    <div
      className={`rounded-lg shadow-light dark:shadow-cardDark ${
        innerTodo ? "p-6" : "p-10"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <h2 className={`font-bold ${innerTodo ? "text-lg" : "text-2xl"}`}>
          {todo.title}
        </h2>
        <div className="text-lg flex items-center gap-2">
          <button aria-label="completed" title="completed">
            <Icon
              className="text-green-300"
              kind={todo.completed ? "completeFilled" : "complete"}
            />
          </button>
          <button aria-label="important" title="important">
            <Icon
              className="text-amber-300"
              kind={todo.important ? "starFilled" : "star"}
            />
          </button>
          <button aria-label="delete" title="delete" onClick={handleDelete}>
            <Icon className="text-red-400" kind={"delete"} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {todo.description}
      </div>

      {!innerTodo && todo.subTodos && todo.subTodos?.length > 0 && (
        <div className="flex flex-col gap-4 pt-6">
          {todo.subTodos.map((currentTodo, i) => {
            return (
              <TodoCard
                key={i}
                todo={{ ...currentTodo, id: todo.id, uid: todo.uid }}
                innerTodo
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
