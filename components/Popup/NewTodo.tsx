import {
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useTodoContext } from "../contexts/useTodoContext";
import { SubTodo, SubTodoWithId, TodoWithId } from "../types/todo";

interface Props {
  togglePopup: () => void;
  update?: boolean;
  todoData?: TodoWithId;
}

const NewTodo = ({ togglePopup, update, todoData }: Props): ReactElement => {
  const [error, setError] = useState("");
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { addTodo, updateTodo } = useTodoContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    if (isRequestPending) {
      return;
    }
    setError("");
    e.preventDefault();
    if (!currentUser || !titleRef.current || !descriptionRef.current)
      return setError("Something went wrong");

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    setIsRequestPending(true);

    if (update && todoData) {
      setIsRequestPending(true);
      const res = await updateTodo({ ...todoData, title, description }).catch(
        () => setError("Something went wrong")
      );
      if (res === true) {
        togglePopup();
      }
      setIsRequestPending(false);
      return;
    }

    if (!update && todoData) {
      const todo: SubTodoWithId = {
        title,
        description,
        completed: false,
        important: false,
        id: Date.now().toString(),
        date: new Date().toString(),
      };
      const updatedTodo: TodoWithId = {
        ...todoData,
        subTodos: todoData.subTodos ? [...todoData.subTodos, todo] : [todo],
      };
      const res = await updateTodo(updatedTodo).catch(() =>
        setError("Something went wrong")
      );
      if (res === true) {
        togglePopup();
      }
      setIsRequestPending(false);
      return;
    }

    const res = await addTodo({
      title,
      description,
      completed: false,
      important: false,
      date: new Date().toString(),
      subTodos: [],
    }).catch(() => setError("Something went wrong"));
    if (res === true) {
      togglePopup();
      titleRef.current.value = "";
      descriptionRef.current.value = "";
    }
    setIsRequestPending(false);
  }

  useEffect(() => {
    if (update) {
      if (!currentUser || !titleRef.current || !descriptionRef.current)
        return setError("Something went wrong");

      titleRef.current.value = todoData?.title || "";
      descriptionRef.current.value = todoData?.description || "";
    }
  }, [update, currentUser, todoData?.title, todoData?.description]);

  return (
    <form
      className="flex flex-col sm:w-96 mb-[4.5rem] sm:mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
        {update ? "Update Todo" : "Add Todo"}
      </h2>
      {/* Input for name */}
      <label className="font-semibold text-sm mb-2" htmlFor="title">
        Title
      </label>
      <input
        className="input"
        id="title"
        ref={titleRef}
        type="text"
        maxLength={25}
        required
      />
      {/* Input for description */}
      <label className="font-semibold text-sm mt-4 mb-2" htmlFor="description">
        Description
      </label>
      <textarea
        className="input"
        id="description"
        rows={4}
        maxLength={100}
        ref={descriptionRef}
      />
      {/* Error messages */}
      {error && (
        <div className="mt-3 text-sm font-medium text-red-500 dark:text-red-400">
          {error}
        </div>
      )}
      <div className="flex gap-2 mt-8">
        {/* Cancel button */}
        <button
          className="btn btn-red h-10 rounded-lg w-full"
          onClick={togglePopup}
        >
          Cancel
        </button>

        {/* Submit button */}
        <button className="btn h-10 rounded-lg w-full" type="submit">
          {update ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default NewTodo;
