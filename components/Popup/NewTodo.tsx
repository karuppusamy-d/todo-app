import {
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { useTodoContext } from "../contexts/useTodoContext";

interface Props {
  togglePopup: () => void;
}

const NewTodo = ({ togglePopup }: Props): ReactElement => {
  const [error, setError] = useState("");
  const { currentUser } = useAuthContext();
  const { addTodo } = useTodoContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    setError("");
    e.preventDefault();
    if (!currentUser || !titleRef.current || !descriptionRef.current)
      return setError("Something went wrong");

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const res = await addTodo({
      title,
      description,
      completed: false,
      date: new Date().toString(),
      important: false,
      subTodos: [],
    });
    if (res === true) {
      togglePopup();
      titleRef.current.value = "";
      descriptionRef.current.value = "";
    }
  }

  return (
    <form
      className="flex flex-col sm:w-96 mb-[4.5rem] sm:mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary-400 dark:text-gray-100 text-center text-3xl font-bold mb-8">
        Add Todo
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
        maxLength={50}
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
        required
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
          Add
        </button>
      </div>
    </form>
  );
};

export default NewTodo;
