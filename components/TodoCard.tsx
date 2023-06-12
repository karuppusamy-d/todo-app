import React, { ReactElement, useState } from "react";
import { WithSubTodo } from "./types/todo";
import Icon from "./Icons";

type Props = {
  todo: WithSubTodo;
  innerTodo?: boolean;
};

const TodoCard = ({ todo, innerTodo }: Props): ReactElement => {
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
              kind={todo.completed ? "complete" : "completeFilled"}
            />
          </button>
          <button aria-label="important" title="important">
            <Icon
              className="text-amber-300"
              kind={todo.important ? "star" : "starFilled"}
            />
          </button>
          <button aria-label="delete" title="delete">
            <Icon className="text-red-400" kind={"delete"} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {todo.description}
      </div>

      {!innerTodo && todo.subTodos && todo.subTodos?.length > 0 && (
        <div className="flex flex-col gap-4 pt-6">
          {todo.subTodos.map((todo, i) => {
            return <TodoCard key={i} todo={todo} innerTodo />;
          })}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
