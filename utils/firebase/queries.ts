import { Todo, TodoWithId } from "@/components/types/todo";
import { firestore } from "./app";

const todosRef = firestore.collection(
  "Todos"
) as FirebaseFirestore.CollectionReference<TodoWithId>;

const getTodos = (uid: string): FirebaseFirestore.Query<TodoWithId> =>
  todosRef.where("uid", "==", uid);

const getTodo = (id: string) => todosRef.doc(id).get();

const addTodo = async (todo: TodoWithId) => todosRef.doc(todo.id).set(todo);

const updateTodo = async (todo: TodoWithId) =>
  todosRef.doc(todo.id).update(todo);

const deleteTodo = async (id: string) => todosRef.doc(id).delete();

export { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
