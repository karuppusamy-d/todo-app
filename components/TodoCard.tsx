import React, { ReactElement, useState } from "react";
import { TodoWithId } from "./types/todo";
import Icon from "./Icons";
import { useTodoContext } from "./contexts/useTodoContext";
import Popup from "./Popup";
import NewTodo from "./Popup/NewTodo";

type Props = {
  todo: TodoWithId;
  parrentTodo?: TodoWithId;
  innerTodo?: boolean;
};

const TodoCard = ({ todo, innerTodo, parrentTodo }: Props): ReactElement => {
  const { deleteTodo, updateTodo } = useTodoContext();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<"add" | "update">("add");
  const [showPopup, setShowPopup] = useState(false);
  const toggleUpdate = () => setShowPopup((curr) => !curr);

  const handleDelete = async () => {
    if (isRequestPending) {
      return;
    }
    setIsRequestPending(true);
    if (!innerTodo) {
      await deleteTodo(todo).catch(() => alert("Something went wrong"));
    } else if (parrentTodo) {
      let updatedTodo: TodoWithId = parrentTodo;
      updatedTodo.subTodos =
        updatedTodo.subTodos?.filter((curr) => {
          if (curr.id === todo.id) {
            return false;
          }
          return true;
        }) || [];
      await updateTodo(updatedTodo).catch(() => alert("Something went wrong"));
    }
    setIsRequestPending(false);
  };

  const handleUpdate = (type: "completed" | "important") => async () => {
    if (isRequestPending) {
      return;
    }
    setIsRequestPending(true);
    let updatedTodo: TodoWithId = todo;
    if (innerTodo && parrentTodo) {
      updatedTodo = parrentTodo;
      updatedTodo.subTodos =
        updatedTodo.subTodos?.map((curr) => {
          if (todo.id === curr.id) {
            if (type === "completed") curr.completed = !curr.completed;
            if (type === "important") curr.important = !curr.important;
            return curr;
          }
          return curr;
        }) || [];
    } else {
      if (type === "completed") updatedTodo.completed = !updatedTodo.completed;
      if (type === "important") updatedTodo.important = !updatedTodo.important;
    }

    await updateTodo(updatedTodo).catch(() => alert("Something went wrong"));
    setIsRequestPending(false);
  };

  return (
    <div
      className={`rounded-lg shadow-light dark:shadow-card-dark ${
        innerTodo ? "p-6" : "p-8 sm:p-10"
      }`}
    >
      <div className="flex items-start gap-3 justify-between flex-wrap">
        <h2
          className={`font-bold break-words ${
            innerTodo ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {todo.title}
        </h2>
        <div
          className={`flex items-start gap-3 ${
            innerTodo ? "text-lg" : "text-xl"
          }`}
        >
          {!innerTodo && (
            <>
              <button
                aria-label="Edit"
                title="Edit"
                onClick={() => {
                  setPopupType("update");
                  setShowPopup(true);
                }}
              >
                <Icon kind={"edit"} />
              </button>
              <button
                aria-label="Add Todo"
                title="Add Todo"
                onClick={() => {
                  setPopupType("add");
                  setShowPopup(true);
                }}
              >
                <Icon kind={"add"} />
              </button>
            </>
          )}
          <button
            aria-label="Important"
            title="Important"
            onClick={handleUpdate("important")}
          >
            <Icon
              className="text-amber-300"
              kind={todo.important ? "starFilled" : "star"}
            />
          </button>

          <button
            aria-label="Completed"
            title="Completed"
            onClick={handleUpdate("completed")}
          >
            <Icon
              className="text-green-300"
              kind={todo.completed ? "completeFilled" : "complete"}
            />
          </button>
          <button
            aria-label="Delete"
            title="Delete"
            onClick={() => handleDelete()}
          >
            <Icon className="text-red-400" kind={"delete"} />
          </button>
        </div>
      </div>

      {todo.description && (
        <div className="text-sm text-gray-700 break-words dark:text-gray-300 mt-2">
          {todo.description}
        </div>
      )}

      {!innerTodo && todo.subTodos && todo.subTodos?.length > 0 && (
        <div className="flex flex-col gap-4 pt-6">
          {todo.subTodos.map((currentTodo, i) => {
            return (
              <TodoCard
                key={i}
                todo={{ ...currentTodo, uid: todo.uid }}
                parrentTodo={todo}
                innerTodo
              />
            );
          })}
        </div>
      )}

      {/* Update projects popup */}
      {showPopup && (
        <Popup showPopup={showPopup} togglePopup={toggleUpdate}>
          <NewTodo
            togglePopup={toggleUpdate}
            update={popupType == "update"}
            todoData={todo}
          />
        </Popup>
      )}
    </div>
  );
};

export default TodoCard;
