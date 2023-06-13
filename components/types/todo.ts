export type SubTodo = {
  title: string;
  description: string;
  date: string;
  important: boolean;
  completed: boolean;
};

export type SubTodoWithId = SubTodo & { id: string };

export type Todo = SubTodo & {
  subTodos?: SubTodoWithId[];
};

export type TodoWithId = Todo & {
  id: string;
  uid: string;
};
